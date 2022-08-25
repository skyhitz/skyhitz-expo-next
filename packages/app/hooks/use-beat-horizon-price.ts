import { useEffect, useState } from 'react'
import { getHorizonPriceLink } from 'app/utils/horizon-links'

async function fetchPriceFromHorizon(code: string, issuer: string) {
  const response = await fetch(getHorizonPriceLink(code, issuer))
  const { asks } = await response.json()

  if (asks && asks[0]) {
    let { price, amount }: { price: string; amount: string } = asks[0]
    return { price: parseFloat(price), amount: parseFloat(amount) }
  }

  return null
}

const getAvailablePrice = (amount?: number, price?: number) => {
  if (!amount || !price) return 0
  return Math.round(amount * price)
}

export default function useBeatHorizonPrice(code?: string, issuer?: string) {
  const [price, setPrice] = useState(0)
  useEffect(() => {
    if (!code || !issuer) return

    fetchPriceFromHorizon(code, issuer).then((p) =>
      setPrice(getAvailablePrice(p?.amount, p?.price))
    )
  }, [setPrice, code, issuer])

  return price
}
