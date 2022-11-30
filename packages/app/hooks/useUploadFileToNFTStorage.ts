import { useCallback, useState } from "react";
import { nftStorageApi } from "app/constants/constants";
import { MediaFileInfo } from "app/types";

type ReturnType = {
  uploadFile: (file: MediaFileInfo) => Promise<string>;
  uploadBlob: (blob: Blob) => Promise<string>;
  progress: number;
};

export default function useUploadFileToNFTStorage(): ReturnType {
  const [progress, setProgress] = useState<number>(0);

  const uploadBlob = useCallback((blob: Blob) => {
    return new Promise<string>(async (resolve, reject) => {
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
        if (request.readyState === 4) {
          setProgress(0);
          const { value, ok, error } = JSON.parse(request.responseText);
          if (!ok) {
            reject(
              error ?? {
                message: "Upload to NFT.storage failed",
                code: "UNKNOWN",
              }
            );
            return;
          }

          resolve(value.cid);
        }
      };
      request.send(blob);
    });
  }, []);

  const uploadFile = useCallback(
    async (file: MediaFileInfo) => {
      const response = await fetch(file.uri);
      const blob = await response.blob();
      return uploadBlob(blob);
    },
    [uploadBlob]
  );

  return { uploadBlob, uploadFile, progress };
}
