import { useCallback, useState } from "react";
import { pinataApi } from "app/constants/constants";

type ReturnType = {
  uploadFile: (_file: Blob) => Promise<string>;
  progress: number;
};

export default function useUploadFileToNFTStorage(): ReturnType {
  const [progress, setProgress] = useState<number>(0);

  const uploadFile = useCallback((file: Blob) => {
    const formData = new FormData();
    formData.append("file", file);
    const options = JSON.stringify({
      cidVersion: 1,
    });
    formData.append("pinataOptions", options);

    return new Promise<string>((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open("POST", `${pinataApi}/pinFileToIPFS`, true);
      request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
      request.setRequestHeader(
        "Authorization",
        `Bearer ${process.env.NEXT_PUBLIC_PINATA_API_KEY}`
      );

      request.upload.addEventListener("progress", (event) => {
        setProgress(Math.round((event.loaded * 100.0) / event.total));
      });

      request.onreadystatechange = () => {
        if (request.readyState === 4) {
          setProgress(0);
          const { IpfsHash, error } = JSON.parse(request.responseText);
          if (!IpfsHash) {
            reject(
              error ?? {
                message: "Upload to storage failed",
                code: "UNKNOWN",
              }
            );
            return;
          }

          resolve(IpfsHash);
        }
      };
      request.send(formData);
    });
  }, []);

  return { uploadFile, progress };
}
