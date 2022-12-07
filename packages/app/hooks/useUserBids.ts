import useSWR from "swr";
import { Config } from "app/config";
import { EnrichedEntry, Offer } from "app/types";
import { useEffect, useState } from "react";
import { algoliaClient, appDomain } from "app/api/algolia";
import { Entry } from "app/api/graphql";

type Result = {
  bids: EnrichedEntry[];
  loading: boolean;
  refetch: () => void;
};

type FetchData = {
  _embedded: { records: Offer[] };
};

const fetcher = async (url: string) => {
  const response = await fetch(url);
  const data: FetchData = await response.json();
  return data;
};

export const getUserBidsUrl = (publicKey: string) =>
  `${Config.HORIZON_URL}/offers?selling_asset_type=native&seller=${publicKey}`;

export function useUserBids(publicKey: string): Result {
  const { data, mutate } = useSWR(getUserBidsUrl(publicKey), fetcher);
  const [entriesOffer, setEntriesOffer] = useState<EnrichedEntry[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (data) {
      const fetchEntries = async () => {
        const offers = data._embedded.records;
        const queries = offers
          .filter((offer) => offer.buying.asset_type === "credit_alphanum12")
          .map((offer) => ({
            indexName: `${appDomain}:entries`,
            params: {
              filters: `issuer:${
                offer.buying.asset_type === "credit_alphanum12"
                  ? offer.buying.asset_issuer
                  : ""
              }`,
            },
          }));
        const { results } = await algoliaClient.multipleQueries<Entry>(queries);
        const entries = results
          .map((result) => {
            if (result.hits.length === 0) return undefined;
            const entry = result.hits[0] as Entry;
            const offer = offers.find(
              (item) =>
                item.buying.asset_type === "credit_alphanum12" &&
                item.buying.asset_issuer === entry?.issuer
            );
            if (offer === undefined) return undefined;
            return { ...entry, offer };
          })
          .filter((item): item is EnrichedEntry => item !== undefined);
        setEntriesOffer(entries);
        setLoading(false);
      };
      setLoading(true);
      fetchEntries();
    }
  }, [data]);

  return { bids: entriesOffer, loading, refetch: mutate };
}
