import { useEffect, useState } from "react";
import { getEntryPrice } from "app/api/rest/entryPrice";

const savedPrice: Map<string, number> = new Map();

const getIdentifier = (code?: string | null, issuer?: string | null) =>
  code && issuer ? `${code}-${issuer}` : "";

export default function useEntryPrice(
  code?: string | null,
  issuer?: string | null
) {
  const identifier = getIdentifier(code, issuer);
  const [data, setData] = useState(savedPrice.get(identifier));

  useEffect(() => {
    if (data === undefined && code && issuer) {
      fetchData(code, issuer).then(setData);
    }
  }, [code, issuer, data]);

  return data;
}

async function fetchData(code: string, issuer: string) {
  let price;
  try {
    price = await getEntryPrice(code, issuer);
  } catch (e) {
    console.error(e);
    price = { price: 0, amount: 0 };
  }

  const displayedPrice = Math.round(price.price * price.amount);

  const identifier = getIdentifier(code, issuer);
  savedPrice.set(identifier, displayedPrice);
  return displayedPrice;
}
