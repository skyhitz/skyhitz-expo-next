import useSWR from "swr";
import { Config } from "app/config";

type FetchData = {
  asks: { price: number; amount: number }[];
};

type Result = {
  price: number;
  amount: number;
  invalidate: () => void;
};

const fetcher = async (url: string) => {
  const response = await fetch(url);
  const data: FetchData = await response.json();
  return data;
};

export function useEntryOffer(
  code?: string | null,
  issuer?: string | null
): Result {
  const { data, mutate } = useSWR(
    `${Config.HORIZON_URL}/order_book?selling_asset_type=credit_alphanum12&selling_asset_code=${code}&selling_asset_issuer=${issuer}&buying_asset_type=native`,
    code && issuer ? fetcher : null,
    {
      dedupingInterval: 30000,
    }
  );

  if (data && data.asks && data.asks[0]) {
    const ask = data.asks[0];
    return { ...ask, invalidate: mutate };
  }

  return { price: 0, amount: 0, invalidate: mutate };
}
