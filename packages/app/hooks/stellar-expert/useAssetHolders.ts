import useSWR from "swr";
import { Maybe } from "app/types";
import { getAssetId } from "app/utils/stellar";
import { Config } from "app/config";
// https://api.stellar.expert/explorer/public/asset/AIGENDRVICE-GBCEH2GSFIPRIYILY6JB37NI7CJWWRGNQO7YFMXSHTC6P4B3QFWT34GS/holders?filter=asset-holders&limit=50&order=desc

type ResponseType = {
  _links: unknown;
  _embedded: {
    _records: {
      account: string;
      balance: string;
      paging_token: string;
    }[];
  };
};

const fetcher = async (assetId: string) => {
  const url = `${Config.STELLAR_EXPERT_URL}/asset/${assetId}/holders`;
  const result = await fetch(url);
  const json = await result.json();
  const data = json as ResponseType;
  if (!data) {
    console.log("Unknown response", json);
    throw new Error("Unknown response");
  }
  return data._embedded._records;
};

export default function useAssetHolders(
  code: Maybe<string>,
  issuer: Maybe<string>
) {
  const id = getAssetId(code, issuer);
  const result = useSWR(id, id ? fetcher : null);
  return result;
}
