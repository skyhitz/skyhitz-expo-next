import useSWR from "swr";
import { Config } from "app/config";

type FetchData = {
  asks: { price: number; amount: number }[];
};

type Result = {
  price: number;
  amount: number;
};

const fetcher = async (url: string) => {
  const response = await fetch(url);
  const data: FetchData = await response.json();
  return data;
};

export const getEntryOfferUrl = (code: string, issuer: string) =>
  `${Config.HORIZON_URL}/order_book?selling_asset_type=credit_alphanum12&selling_asset_code=${code}&selling_asset_issuer=${issuer}&buying_asset_type=native`;

export function useEntryOffer(code: string, issuer: string): Result {
  const { data } = useSWR(
    getEntryOfferUrl(code, issuer),
    code && issuer ? fetcher : null,
    {
      dedupingInterval: 30000,
    }
  );

  if (data && data.asks && data.asks[0]) {
    const ask = data.asks[0];
    return { ...ask };
  }

  return { price: 0, amount: 0 };
}
