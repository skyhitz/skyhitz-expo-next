import useSWR from "swr";
import { Config } from "app/config";
import { Offer } from "app/types";

type FetchData = {
  _embedded: { records: Offer[] };
};

const fetcher = async (url: string) => {
  const response = await fetch(url);
  const data: FetchData = await response.json();
  return data;
};

const getUrl = (publicKey: string) =>
  `${Config.HORIZON_URL}/offers?selling_asset_type=native&seller=${publicKey}`;

export function useUserBuyOffer(publicKey: string): Offer[] {
  const { data } = useSWR(getUrl(publicKey), fetcher, {
    dedupingInterval: 30000,
  });

  if (data) {
    const offers = data._embedded.records;
    return offers;
  }

  return [];
}
