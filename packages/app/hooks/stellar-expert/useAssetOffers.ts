import { Maybe } from "app/types";
import { getAssetId } from "app/utils/stellar";
import useSWR from "swr";
import { Config } from "app/config";

type ResponseType = {
  _links: unknown;
  _embedded: {
    _records: {
      id: string;
      paging_token: string;
      type: number;
      ts: number;
      accounts: string[];
      ledger: number;
      tx: string;
      assets: string[];
      source_amount: string;
      offer?: string;
      price: {
        n: number;
        d: number;
      };
      createdOffer?: string;
      memo?: string;
      memo_type?: number;
    }[];
  };
};

const fetcher = async (assetId: string) => {
  const url = `${Config.STELLAR_EXPERT_URL}/asset/${assetId}/offer`;
  const result = await fetch(url);
  const json = await result.json();
  const data = json as ResponseType;
  if (!data) {
    console.log("Unknown response", json);
    throw new Error("Unknown response");
  }
  return data._embedded._records;
};

export default function useAssetOffers(
  code: Maybe<string>,
  issuer: Maybe<string>
) {
  const id = getAssetId(code, issuer);
  const result = useSWR(id, id ? fetcher : null);
  return result;
}
