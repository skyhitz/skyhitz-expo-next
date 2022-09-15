import { Config } from "app/config";

export async function getEntryPrice(code: string, issuer: string) {
  const response = await fetch(
    `${Config.HORIZON_URL}/order_book?selling_asset_type=credit_alphanum12&selling_asset_code=${code}&selling_asset_issuer=${issuer}&buying_asset_type=native`
  );
  const { asks } = await response.json();
  if (asks) {
    if (asks[0]) {
      const { price, amount }: { price: string; amount: string } = asks[0];
      return { price: parseFloat(price), amount: parseFloat(amount) };
    }
    return { price: 0, amount: 0 };
  }

  throw { message: "Unknown error" };
}
