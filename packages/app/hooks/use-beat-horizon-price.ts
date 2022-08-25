import { useEffect, useState } from 'react'
import { getHorizonPriceLink } from 'app/utils/horizon-links'

async function fetchPriceFromHorizon(code: string, issuer: string) {
  let response = await fetch(getHorizonPriceLink(code, issuer))

  let { asks } = await response.json()

  if (asks && asks[0]) {
    let { price, amount }: { price: string; amount: string } = asks[0]
    return { price: parseFloat(price), amount: parseFloat(amount) }
  }

  return null
}

export default function useBeatHorizonPrice(code?: string, issuer?: string) {
  const [price, setPrice] = useState(0)
  useEffect(() => {
    if (!code || !issuer) return

    fetchPriceFromHorizon(code, issuer).then((p) => setPrice(p?.price ?? 0))
  }, [setPrice, code, issuer])

  return price
}
