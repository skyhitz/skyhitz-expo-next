import { useApolloClient } from "@apollo/client";
import { AudibleTokenDocument, AudibleTokenQuery } from "app/api/graphql";
import { useCallback } from "react";
import * as Crypto from "expo-crypto";
import { MediaFileInfo } from "app/types";
import { Platform } from "react-native";

type Return = {
  verify: (beatToCheck: MediaFileInfo) => Promise<boolean>;
};

export function useAudibleCheck(): Return {
  const { query } = useApolloClient();

  const verify = useCallback(async (beatToCheck: MediaFileInfo) => {
    return new Promise<boolean>(async (resolve, reject) => {
      if (beatToCheck.image) {
        reject(Error("Provided file is an image!"));
        return;
      }
      // requests access token
      const { data } = await query<AudibleTokenQuery>({
        query: AudibleTokenDocument,
        fetchPolicy: "network-only",
      });
      if (!data.getAudibleToken?.token) {
        reject(Error("Could not obtain access token"));
        return;
      }

      try {
        const id = await Crypto.digestStringAsync(
          Crypto.CryptoDigestAlgorithm.SHA256,
          beatToCheck.uri
        );
        // compose and sends request to audible service
        const body = new FormData();
        if (Platform.OS === "web") {
          const response = await fetch(beatToCheck.uri);
          const file = await response.blob();
          body.append("beat", file);
        } else {
          body.append(
            "beat",
            JSON.parse(
              JSON.stringify({
                uri: beatToCheck.uri,
                type: beatToCheck.mimeType,
                name: id,
              })
            )
          );
        }
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
            console.log(request.status, request.responseText);
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
