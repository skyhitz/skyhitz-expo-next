import { Config } from 'app/config'
import { useEffect, useState } from 'react'

async function fetchPriceFromHorizon(code: string, issuer: string) {
  let response = await fetch(
    `${Config.HORIZON_URL}/order_book?selling_asset_type=credit_alphanum12&selling_asset_code=${code}&selling_asset_issuer=${issuer}&buying_asset_type=native`
  )

  let { asks } = await response.json()
  // TODO: remove
  console.log(asks)

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
