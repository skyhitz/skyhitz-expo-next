import { useCallback, useState } from "react";
import { nftStorageApi } from "app/constants/constants";

export default function useUploadFileToNFTStorage() {
  const [progress, setProgress] = useState<number>(0);

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

  return { uploadFile, progress };
}
