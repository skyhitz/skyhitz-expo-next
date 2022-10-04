import { Config } from "app/config";
import {
  Account,
  BASE_FEE,
  Networks,
  Operation,
  TransactionBuilder,
} from "stellar-base";

const stellarExplorer = "https://stellar.expert/explorer/";
const horizonTestnet = "https://horizon-testnet.stellar.org";

export const getAssetId = (code: string, issuer: string) => {
  return `${code}-${issuer}`;
};

export const stellarAssetLink = (code: string, issuer: string) =>
  `${stellarExplorer}${
    Config.HORIZON_URL === horizonTestnet ? "testnet" : "public"
  }/asset/${code}-${issuer}`;

export const stellarAccountLink = (publicKey: string) =>
  `${stellarExplorer}${
    Config.HORIZON_URL === horizonTestnet ? "testnet" : "public"
  }/account/${publicKey}`;

export const getNetworkPassphrase = () => {
  switch (Config.HORIZON_URL) {
    case "https://horizon-testnet.stellar.org":
      return Networks["TESTNET"];
    default:
      return Networks["PUBLIC"];
  }
};

const getAccountData = async (address: string) => {
  const res = await fetch(`${Config.HORIZON_URL}/accounts/${address}`);
  const json = await res.json();
  return json;
};

export const getFee = async (
  horizonUrl: string = Config.HORIZON_URL
): Promise<string> => {
  try {
    const res = await fetch(horizonUrl + `/fee_stats`);
    const { feeStats } = await res.json();
    return feeStats.max_fee.mode;
  } catch (e) {
    return BASE_FEE;
  }
};

export async function getAccount(publicKey: string) {
  const { id, sequence } = await getAccountData(publicKey);
  return new Account(id, sequence);
}

async function buildTransactionWithFee(accountPublicKey: string) {
  const [account, fee] = await Promise.all([
    getAccount(accountPublicKey),
    getFee(),
  ]);
  return new TransactionBuilder(account, {
    fee,
    networkPassphrase: getNetworkPassphrase(),
  });
}

export const buildTransactionForAuth = async (publicKey: string) => {
  const transaction = await buildTransactionWithFee(publicKey);
  return transaction
    .addOperation(
      Operation.manageData({
        source: publicKey,
        name: "skyhitz",
        value: "The owner of this account is a Skyhitz user.",
      })
    )
    .setTimeout(0)
    .build()
    .toEnvelope()
    .toXDR("base64");
};
