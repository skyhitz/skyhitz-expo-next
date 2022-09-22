import {
  GetIssuerQuery,
  useCreateEntryMutation,
  useGetIssuerLazyQuery,
} from "app/api/graphql";
import { ipfsProtocol } from "app/constants/constants";
import { MintForm } from "app/types";
import { useCallback, useState } from "react";
import { useIndexEntryMutation } from "../api/graphql";
import useUploadFileToNFTStorage from "app/hooks/useUploadFileToNFTStorage";

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
  const { uploadFile, progress } = useUploadFileToNFTStorage();
  const [error, setError] = useState<string | undefined>();
  const [formValues, setFormValues] = useState<MintForm | undefined>();
  const [imageCid, setImageCid] = useState<string>("");
  const [videoCid, setVideoCid] = useState<string>("");
  const [issuer, setIssuer] = useState<string>("");
  const [createEntry] = useCreateEntryMutation();
  const [indexEntry] = useIndexEntryMutation();

  const indexNFT = useCallback(
    async (nftIssuer: string = issuer) => {
      setError(undefined);
      setStatus("Indexing");
      const { data: indexed } = await indexEntry({
        variables: { issuer: nftIssuer },
      });
      if (indexed?.indexEntry?.success) {
        setStatus("Success");
      } else {
        setStatus("IndexError");
        setError(indexed?.indexEntry?.message ?? "Couldn't index new entry");
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
        name,
        description,
        code,
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
          code,
          forSale: availableForSale,
          price: parseInt(price ?? "0", 10) || 0,
          equityForSale: (equityForSale ?? 0) / 100,
        },
      });
      if (entry?.createEntry?.success && entry.createEntry.submitted) {
        indexNFT(data.getIssuer);
      } else {
        // TODO handle unsubmitted case with wallet connect
        setStatus("Error");
        setError(entry?.createEntry?.message ?? "Couldn't submit transaction.");
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
