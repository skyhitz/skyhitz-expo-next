import { useApolloClient } from "@apollo/client";
import { AudibleTokenDocument, AudibleTokenQuery } from "app/api/graphql";
import { useCallback } from "react";
import * as Crypto from "expo-crypto";

type Return = {
  verify: (beatToCheck: Blob) => Promise<boolean>;
};

export function useAudibleCheck(): Return {
  const { query } = useApolloClient();

  const verify = useCallback(async (beatToCheck: Blob) => {
    return new Promise<boolean>(async (resolve, reject) => {
      // requests access token
      const { data } = await query<AudibleTokenQuery>({
        query: AudibleTokenDocument,
        fetchPolicy: "network-only",
      });
      if (!data.getAudibleToken?.token) {
        reject( Error("Could not obtain access token"));
        return;
      }

      // generates unique id for video file
      const generateHash = () =>
        new Promise<string>(async (resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsArrayBuffer(beatToCheck);
          fileReader.onloadend = async function () {
            if (fileReader.result === null) {
              reject(Error("Couldn't convert file to base64"));
            } else {
              let videoString = fileReader.result;
              if (typeof videoString !== "string") {
                videoString = new TextDecoder().decode(videoString);
              }
              const digest = await Crypto.digestStringAsync(
                Crypto.CryptoDigestAlgorithm.SHA256,
                videoString
              );
              resolve(digest);
            }
          };
        });

      try {
        const id = await generateHash();
        // compose and sends request to audible service
        const body = new FormData();
        body.append("beat", beatToCheck);
        body.append("id", id);
        const request = new XMLHttpRequest();
        // TODO change URL
        request.open("POST", "http://142.93.241.220/identify");
        request.setRequestHeader(
          "Authorization",
          `Bearer ${data.getAudibleToken.token}`
        );

        request.onreadystatechange = () => {
          if (request.readyState === 4) {
            const { message } = JSON.parse(request.responseText);
            if (request.status !== 200) {
              reject(
                Error(message ?? "Couldn't verify if the file is original")
              );
            } else {
              resolve(true);
            }
          }
        };
        request.send(body);
      } catch (ex) {
        reject(ex);
      }
    });
  }, []);

  return { verify };
}
