import { useCreateEntryMutation, useGetIssuerLazyQuery } from "app/api/graphql";
import { ipfsProtocol, nftStorageApi } from "app/constants/constants";
import { MintForm } from "app/types"
import { useCallback, useState } from "react";
import { useIndexEntryMutation } from '../api/graphql';

type MintStatus = "UNINITIALIZED" | "UPLOADING FILES" | "UPLOADING METADATA" | "GENERATING XDR AND SUBMITTING" | "INDEXING" | "SUCCESS" | "ERROR";

type MintResult = {
    mint: (_formData: MintForm, _artwork: Blob, _video: Blob) => void;
    progress: number;
    status: MintStatus;
    error?: string;
}

export function useMintNFT(): MintResult {
    const [status, setStatus] = useState<MintStatus>("UNINITIALIZED");
    const [progress, setProgress] = useState<number>(0)
    const [error, setError] = useState<string | undefined>()
    const [getIssuer] = useGetIssuerLazyQuery()
    const [createEntry] = useCreateEntryMutation()
    const [indexEntry] = useIndexEntryMutation()

    const uploadFile = useCallback((file: Blob) => {
        // TODO fix that
        console.log(process.env.NEXT_PUBLIC_NFT_STORAGE_API_KEY);
        return new Promise<string>((resolve, reject) => {
             const request = new XMLHttpRequest()
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
                reject()
            } else {
                setProgress(0);
                resolve(value.cid);
            }
          }
        };

        request.send(file);
        })
      }, [])
    

    const mint = useCallback(async ({artist, title, description, availableForSale, equityForSale, price}: MintForm, artwork: Blob, video: Blob) => {
        try {

        
        setStatus("UPLOADING FILES");
        const name = `${artist} - ${title}`;    
        const code = `${title}${artist}`
          .normalize("NFD")
          .replace(/\p{Diacritic}/gu, "")
          .replace(/ /g, "")
          .replace(/-/g, "")
          .replace(/[^0-9a-z]/gi, "")
          .slice(0, 12)
          .toUpperCase();

        const imageCid = await uploadFile(artwork);
        const videoCid = await uploadFile(video)
    
        setStatus("UPLOADING METADATA");

        const imageUrl = `${ipfsProtocol}${imageCid}`;
        const videoUrl = `${ipfsProtocol}${videoCid}`;
    
        const {data, error} = await getIssuer({variables: {cid: videoCid}});
        console.log(data)
        if (error || !data?.getIssuer) {
            setStatus("ERROR")
            setError("Couldn't generate issuer")
            return;
        }

        const issuer = data.getIssuer;
        console.log(issuer)
    
        const json = {
          name: name,
          description: description,
          code: code,
          issuer: issuer,
          domain: "skyhitz.io",
          supply: 1,
          image: imageUrl,
          animation_url: videoUrl,
          video: videoUrl,
          url: videoUrl,
        };
    
        const blob = new Blob([JSON.stringify(json)], { type: "application/json" });
        const nftCid = await uploadFile(blob);

        setStatus("GENERATING XDR AND SUBMITTING");
        const {data: entry} = await createEntry({variables: {fileCid: videoCid, metaCid: nftCid, code, forSale: availableForSale, price: price ?? 0, equityForSale: equityForSale ?? 0.0}}) 
        if (entry?.createEntry?.success && entry.createEntry.submitted) {
            setStatus("INDEXING")
            const {data: indexed, errors} = await indexEntry({variables: {issuer}})
            if (errors || !indexed?.indexEntry) {
                setStatus("ERROR")
                setError("Couldn't index new entry");
                return;
            } else {
                setStatus("SUCCESS");
                return;
            }
        } else {
            // TODO handle this case with wallet connect
            setStatus("ERROR")
            setError("Couldn't submit transaction")
            return;
        }
    } catch(ex){
        console.log(ex)
        setError("Something went wrong")
    }
    }, [createEntry, getIssuer, indexEntry, setError, setStatus, uploadFile])


    return {
        mint, progress, status, error
    }
}