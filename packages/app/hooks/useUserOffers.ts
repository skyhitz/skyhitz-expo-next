import { Config } from "app/config";
import useSWR from "swr";
import { OfferRecord } from "app/types";

type FetchedOffer = {
  _embedded: {
    records: OfferRecord[];
  };
};

const fetcher = async (url: string) => {
  const response = await fetch(url);
  const data: FetchedOffer = await response.json();
  return data;
};

export const sellOffersUrl = (
  seller: string | undefined,
  asset_issuer: string,
  asset_code: string
) =>
  `${Config.HORIZON_URL}/offers?&seller=${seller}&selling_asset_type=credit_alphanum12&selling_asset_issuer=${asset_issuer}&selling_asset_code=${asset_code}&include_failed=false`;

export const buyOffersUrl = (
  seller: string | undefined,
  asset_issuer: string,
  asset_code: string
) =>
  `${Config.HORIZON_URL}/offers?&seller=${seller}&buying_asset_type=credit_alphanum12&buying_asset_issuer=${asset_issuer}&buying_asset_code=${asset_code}&include_failed=false`;

export function useUserOffers(
  seller: string | undefined,
  asset_issuer: string,
  asset_code: string,
  sellOffers: boolean = true
): { offers: OfferRecord[] } {
  const url = sellOffers
    ? sellOffersUrl(seller, asset_issuer, asset_code)
    : buyOffersUrl(seller, asset_issuer, asset_code);

  const { data } = useSWR(url, seller ? fetcher : null, {
    dedupingInterval: 30000,
  });

  if (data && data._embedded && data._embedded.records) {
    return { offers: data._embedded.records };
  }

  return { offers: [] };
}
