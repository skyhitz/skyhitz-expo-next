import useSWR from "swr";
import { Maybe } from "app/types";
import { getAssetId } from "app/utils/stellar";
import fetcher from "app/hooks/stellar-expert/stellarExperFetcher";

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

export default function useAssetHolders(
  code: Maybe<string>,
  issuer: Maybe<string>
) {
  const id = getAssetId(code, issuer);
  const result = useSWR(
    [id, "holders?limit=100"],
    id ? fetcher<ResponseType> : null
  );
  return result;
}
