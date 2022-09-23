import { Maybe } from "app/types";
import { getAssetId } from "app/utils/stellar";
import useSWR from "swr";
import fetcher from "app/hooks/stellar-expert/stellarExperFetcher";

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

export default function useAssetOffers(
  code: Maybe<string>,
  issuer: Maybe<string>
) {
  const id = getAssetId(code, issuer);
  const result = useSWR(
    [id, "history/offers?limit=100&order=desc"],
    id ? fetcher<ResponseType> : null
  );
  return result;
}
