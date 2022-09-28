import useSWR from "swr";

type FetchData = {
  asks: { price: number; amount: number }[];
};

const fetcher = async (url: string) => {
  const response = await fetch(url);
  const data: FetchData = await response.json();
  return data;
};

export default function useUSDPrice(xlm: number): number {
  const { data } = useSWR(
    "https://horizon.stellar.org/order_book?selling_asset_type=native&buying_asset_type=credit_alphanum4&buying_asset_code=USDC&buying_asset_issuer=GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN&limit=1",
    fetcher,
    {
      dedupingInterval: 30000,
    }
  );

  if (data && data.asks && data.asks[0]) {
    const ask = data.asks[0];
    return ask.price * xlm;
  }

  return 0;
}
