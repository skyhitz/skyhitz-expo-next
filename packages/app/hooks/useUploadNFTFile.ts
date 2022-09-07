import { nftStorageApi } from "app/constants/constants";
import { useCallback, useState } from "react";

type Result = {
    cid: string | null;
    error: boolean;
    progress: number;
    uploadFile: (_file: Blob) => void;
}

export function useUploadNFTFile(): Result {
    const [progress, setProgress] = useState<number>(0)
    const [error, setError] = useState<boolean>(false)
    const [cid, setCid] = useState<string | null>(null)

    const uploadFile = useCallback((file: Blob) => {
        setProgress(0);
        setCid(null)
        setError(false)
        console.log(process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY);
        const request = new XMLHttpRequest()
        request.open("POST", `${nftStorageApi}/upload`, true);
        request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        request.setRequestHeader(
          "Authorization",
          `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEM3REIzNmNmMzc4MEFkZTBFNDNiOEIyRTE0ZTEzQUI1ZDQ4Mjc2ZjYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYzODM2Mjk3Mjk4OCwibmFtZSI6InNreWhpdHoifQ.i8u1UvSe4DawKTXh_1pzfeYe932rqAJAvsKqndaw0vU`
        );
  
        request.upload.addEventListener("progress", (event) => {
          setProgress(Math.round((event.loaded * 100.0) / event.total));
        });
  
        request.onreadystatechange = () => {
          if (request.readyState == 4 && request.status == 200) {
            const { value, ok } = JSON.parse(request.responseText);
            if (!ok) {
             setError(true)
            } else {
                setCid(value.cid);
            }
          }
        };

        request.send(file);
      }, [])

   return {cid, progress, error, uploadFile}
  }