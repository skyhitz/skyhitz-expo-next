import { useEffect, useState } from "react";
import { getEntryPrice } from "app/api/rest/entryPrice";
import { isSome } from "app/utils";

const savedPrice: Map<string, number> = new Map();

const getIdentifier = (code: string, issuer: string) => `${code}-${issuer}`;

export default function useEntryPrice(code: string, issuer: string) {
  const identifier = getIdentifier(code, issuer);
  const [data, setData] = useState(savedPrice.get(identifier));

  useEffect(() => {
    if (isSome(data)) return;
    fetchData(code, issuer).then(setData);
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
