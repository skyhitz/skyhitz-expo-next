import { useEffect, useState } from "react";
import { getEntryPrice } from "app/api/rest/entryPrice";

const savedPrice: Map<string, number> = new Map();

const getIdentifier = (code?: string | null, issuer?: string | null) =>
  code && issuer ? `${code}-${issuer}` : "";

export default function useEntryPrice(
  code?: string | null,
  issuer?: string | null
) {
  const identifier: string = getIdentifier(code, issuer);
  const [data, setData] = useState<number | undefined>(
    savedPrice.get(identifier)
  );

  async function fetchData(code: string, issuer: string) {
    const price = await getEntryPrice(code, issuer);
    const displayedPrice = Math.round(price.price * price.amount);

    const identifier = getIdentifier(code, issuer);
    savedPrice.set(identifier, displayedPrice);
    setData(displayedPrice);
  }

  useEffect(() => {
    if (data === undefined && code && issuer) {
      fetchData(code, issuer);
    }
  }, [code, issuer, data]);

  return data;
}
