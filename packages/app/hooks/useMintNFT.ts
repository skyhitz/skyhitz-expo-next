import {
  GetIssuerQuery,
  useCreateEntryMutation,
  useIndexEntryMutation,
  UserCollectionDocument,
  RecentlyAddedDocument,
  TopChartDocument,
  GetIssuerDocument,
} from "app/api/graphql";
import { ipfsProtocol } from "app/constants/constants";
import { MintForm } from "app/types";
import { useCallback, useState } from "react";
import useUploadFileToNFTStorage from "app/hooks/useUploadFileToNFTStorage";
import { useWalletConnectClient } from "app/provider/WalletConnect";
import { useApolloClient, ApolloError } from "@apollo/client";
import { prepend } from "ramda";
import { useRecoilValue } from "recoil";
import { userAtom } from "app/state/user";

type MintStatus =
  | "Uninitialized"
  | "Uploading files"
  | "Uploading metadata"
  | "Submitting"
  | "Sign transaction in your wallet"
  | "Indexing"
  | "Success"
  | "Error"
  | "IndexError";

type MintResult = {
  mint: (
    formData: MintForm,
    artwork: Blob,
    video: Blob,
    showModal: (uri: string) => void
  ) => void;
  retryIndex: () => void;
  progress: number;
  status: MintStatus;
  error?: string;
};

export function useMintNFT(): MintResult {
  const [status, setStatus] = useState<MintStatus>("Uninitialized");
  const { uploadFile, progress } = useUploadFileToNFTStorage();
  const [error, setError] = useState<string | undefined>();
  const [issuer, setIssuer] = useState<string>("");
  const [createEntry] = useCreateEntryMutation();
  const [indexEntry] = useIndexEntryMutation();
  const { signAndSubmitXdr, session, connect } = useWalletConnectClient();
  const { cache, query } = useApolloClient();
  const user = useRecoilValue(userAtom);

  const indexNFT = useCallback(
    async (nftIssuer: string = issuer) => {
      setError(undefined);
      setStatus("Indexing");
      try {
        const { data: indexedEntry } = await indexEntry({
          variables: { issuer: nftIssuer },
        });
        cache.updateQuery(
          {
            query: RecentlyAddedDocument,
            variables: { page: 0 },
            overwrite: true,
          },
          (cachedData) => ({
            recentlyAdded: prepend(
              indexedEntry?.indexEntry,
              cachedData?.recentlyAdded ?? []
            ),
          })
        );
        cache.updateQuery(
          {
            query: TopChartDocument,
            variables: { page: 0 },
            overwrite: true,
          },
          (cachedData) => ({
            topChart: prepend(
              indexedEntry?.indexEntry,
              cachedData?.topChart ?? []
            ),
          })
        );
        cache.updateQuery(
          {
            query: UserCollectionDocument,
            variables: { userId: user?.id },
            overwrite: true,
          },
          (cachedData) => ({
            userEntries: prepend(
              indexedEntry?.indexEntry,
              cachedData?.userEntries ?? []
            ),
          })
        );

        setStatus("Success");
      } catch (ex) {
        setStatus("IndexError");

        if (ex instanceof ApolloError) {
          setError(ex.message);
        } else {
          setError("Couldn't index new entry");
        }
      }
    },
    [setStatus, setError, indexEntry, issuer]
  );

  const mint = useCallback(
    async (
      form: MintForm,
      artwork: Blob,
      video: Blob,
      showModal: (uri: string) => void
    ) => {
      setError(undefined);
      setStatus("Uploading files");

      const imageCidResponse = await uploadFile(artwork);
      const videoCidResponse = await uploadFile(video);

      setStatus("Uploading metadata");
      const { data } = await query<GetIssuerQuery>({
        query: GetIssuerDocument,
        variables: { cid: videoCidResponse },
      });

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
      } = form;
      const name = `${artist} - ${title}`;
      const code = `${title}${artist}`
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .replace(/ /g, "")
        .replace(/-/g, "")
        .replace(/[^0-9a-z]/gi, "")
        .slice(0, 12)
        .toUpperCase();
      const imageUrl = `${ipfsProtocol}${imageCidResponse}`;
      const videoUrl = `${ipfsProtocol}${videoCidResponse}`;

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
          fileCid: videoCidResponse,
          metaCid: nftCid,
          code,
          forSale: availableForSale,
          price: parseInt(price ?? "0", 10) || 0,
          equityForSale: (equityForSale ?? 0) / 100,
        },
      });
      if (entry?.createEntry?.success && entry.createEntry.submitted) {
        indexNFT(data.getIssuer);
      } else if (entry?.createEntry?.success && entry?.createEntry?.xdr) {
        // unsubmitted case, we need to sign and submit transaction ourselves
        setStatus("Sign transaction in your wallet");
        const xdr = entry.createEntry.xdr;
        try {
          // TODO fix that
          let currentSession = session;
          if (!currentSession) {
            currentSession = await connect(showModal);
          }
          const response = await signAndSubmitXdr(xdr, currentSession);
          const { status } = response as { status: string };
          if (status === "success") {
            indexNFT(data.getIssuer);
          } else {
            setStatus("Error");
            setError(
              "Something went wrong during signing and submitting transaction in your wallet."
            );
          }
        } catch (ex) {
          setStatus("Error");

          if (typeof ex === "string") {
            setError(ex);
          } else {
            setError(
              "Something went wrong during signing and submitting transaction in your wallet."
            );
          }
        }
      } else {
        setStatus("Error");
        setError(entry?.createEntry?.message ?? "Couldn't submit transaction.");
      }
    },
    [setStatus, uploadFile, setError, indexNFT, signAndSubmitXdr, createEntry]
  );

  return {
    mint,
    retryIndex: indexNFT,
    progress,
    status,
    error,
  };
}
