import useSWR from "swr";
import { Config } from "app/config";

type FetchData = {
  asks: { price: number; amount: number }[];
};

const fetcher = async (url: string) => {
  const response = await fetch(url);
  const data: FetchData = await response.json();
  return data;
};

export default function useEntryPrice(
  code?: string | null,
  issuer?: string | null
) {
  const { data } = useSWR(
    `${Config.HORIZON_URL}/order_book?selling_asset_type=credit_alphanum12&selling_asset_code=${code}&selling_asset_issuer=${issuer}&buying_asset_type=native`,
    code && issuer ? fetcher : null,
    {
      dedupingInterval: 30_000,
    }
  );

  if (data && data.asks && data.asks[0]) {
    const ask = data.asks[0];
    return Math.round(ask.price * ask.amount);
  }

  return 0;
}
