import { Config } from 'app/config'

const stellarExplorer = 'https://stellar.expert/explorer/'
const horizonTestnet = 'https://horizon-testnet.stellar.org'

export const getStellarAssetLink = (code: string, issuer: string) =>
  `${stellarExplorer}${
    Config.HORIZON_URL === horizonTestnet ? 'testnet' : 'public'
  }/asset/${code}-${issuer}`

export const getStellarAccountLink = (publicKey: string) =>
  `${stellarExplorer}${
    Config.HORIZON_URL === horizonTestnet ? 'testnet' : 'public'
  }/account/${publicKey}`

export const getHorizonPriceLink = (code: string, issuer: string) => {
  return `${Config.HORIZON_URL}/order_book?selling_asset_type=credit_alphanum12&selling_asset_code=${code}&selling_asset_issuer=${issuer}&buying_asset_type=native`
}
