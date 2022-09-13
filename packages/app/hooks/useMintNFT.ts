import {
  GetIssuerQuery,
  useCreateEntryMutation,
  useGetIssuerLazyQuery,
} from "app/api/graphql";
import { ipfsProtocol, nftStorageApi } from "app/constants/constants";
import { MintForm } from "app/types";
import { useCallback, useState } from "react";
import { useIndexEntryMutation } from "../api/graphql";

type MintStatus =
  | "Uninitialized"
  | "Uploading files"
  | "Uploading metadata"
  | "Submitting"
  | "Indexing"
  | "Success"
  | "Error"
  | "IndexError";

type MintResult = {
  mint: (_formData: MintForm, _artwork: Blob, _video: Blob) => void;
  retryIndex: () => void;
  progress: number;
  status: MintStatus;
  error?: string;
};

export function useMintNFT(): MintResult {
  const [status, setStatus] = useState<MintStatus>("Uninitialized");
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string | undefined>();
  const [formValues, setFormValues] = useState<MintForm | undefined>();
  const [imageCid, setImageCid] = useState<string>("");
  const [videoCid, setVideoCid] = useState<string>("");
  const [issuer, setIssuer] = useState<string>("");
  const [createEntry] = useCreateEntryMutation();
  const [indexEntry] = useIndexEntryMutation();

  const uploadFile = useCallback((file: Blob) => {
    return new Promise<string>((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open("POST", `${nftStorageApi}/upload`, true);
      request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
      request.setRequestHeader(
        "Authorization",
        `Bearer ${process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY}`
      );

      request.upload.addEventListener("progress", (event) => {
        setProgress(Math.round((event.loaded * 100.0) / event.total));
      });

      request.onreadystatechange = () => {
        if (request.readyState == 4 && request.status == 200) {
          const { value, ok } = JSON.parse(request.responseText);
          if (!ok) {
            reject();
          } else {
            setProgress(0);
            resolve(value.cid);
          }
        }
      };
      request.send(file);
    });
  }, []);

  const indexNFT = useCallback(
    async (nftIssuer: string = issuer) => {
      setError(undefined);
      setStatus("Indexing");
      const { data: indexed } = await indexEntry({
        variables: { issuer: nftIssuer },
      });
      if (indexed?.indexEntry?.success) {
        setStatus("Success");
        return;
      } else {
        setStatus("IndexError");
        setError(indexed?.indexEntry?.message ?? "Couldn't index new entry");
        return;
      }
    },
    [setStatus, setError, indexEntry, issuer]
  );

  const onIssuerQueryCompleted = useCallback(
    async (data: GetIssuerQuery) => {
      if (!formValues) return;
      if (!data?.getIssuer) {
        setStatus("Error");
        setError("Couldn't generate issuer");
        return;
      }
      const {
        artist,
        title,
        description,
        availableForSale,
        price,
        equityForSale,
      } = formValues;
      const name = `${artist} - ${title}`;
      const code = `${title}${artist}`
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .replace(/ /g, "")
        .replace(/-/g, "")
        .replace(/[^0-9a-z]/gi, "")
        .slice(0, 12)
        .toUpperCase();
      const imageUrl = `${ipfsProtocol}${imageCid}`;
      const videoUrl = `${ipfsProtocol}${videoCid}`;

      setIssuer(data.getIssuer);

      const json = {
        name: name,
        description: description,
        code: code,
        issuer: data.getIssuer,
        domain: "skyhitz.io",
        supply: 1,
        image: imageUrl,
        animation_url: videoUrl,
        video: videoUrl,
        url: videoUrl,
      };

      const blob = new Blob([JSON.stringify(json)], {
        type: "application/json",
      });
      const nftCid = await uploadFile(blob);

      setStatus("Submitting");
      const { data: entry } = await createEntry({
        variables: {
          fileCid: videoCid,
          metaCid: nftCid,
          code: code,
          forSale: availableForSale,
          price: parseInt(price ?? "0") || 0,
          equityForSale: (equityForSale ?? 0) / 100,
        },
      });
      if (entry?.createEntry?.success && entry.createEntry.submitted) {
        indexNFT(data.getIssuer);
      } else {
        // TODO handle unsubmitted case with wallet connect
        setStatus("Error");
        setError(entry?.createEntry?.message ?? "Couldn't submit transaction.");
        return;
      }
    },
    [
      createEntry,
      setError,
      setStatus,
      uploadFile,
      formValues,
      imageCid,
      videoCid,
      indexNFT,
    ]
  );

  const [getIssuer] = useGetIssuerLazyQuery({
    onCompleted: onIssuerQueryCompleted,
  });

  const mint = useCallback(
    async (form: MintForm, artwork: Blob, video: Blob) => {
      setError(undefined);
      setFormValues(form);
      setStatus("Uploading files");

      const imageCidResponse = await uploadFile(artwork);
      const videoCidResponse = await uploadFile(video);

      setImageCid(imageCidResponse);
      setVideoCid(videoCidResponse);

      setStatus("Uploading metadata");
      await getIssuer({ variables: { cid: videoCidResponse } });
    },
    [getIssuer, setStatus, uploadFile]
  );

  return {
    mint,
    retryIndex: indexNFT,
    progress,
    status,
    error,
  };
}
