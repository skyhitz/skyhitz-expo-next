import { Config } from "app/config";

const stellarExplorer = "https://stellar.expert/explorer/";
const horizonTestnet = "https://horizon-testnet.stellar.org";

export const stellarAssetLink = (code: string, issuer: string) =>
  `${stellarExplorer}${
    Config.HORIZON_URL === horizonTestnet ? "testnet" : "public"
  }/asset/${code}-${issuer}`;

export const stellarAccountLink = (publicKey: string) =>
  `${stellarExplorer}${
    Config.HORIZON_URL === horizonTestnet ? "testnet" : "public"
  }/account/${publicKey}`;
