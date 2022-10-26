import { useCallback } from "react";
import { Config } from "app/config";
import { Linking } from "react-native";

type Props = {
  publicAddress: string;
};
type Result = {
  startCheckout: () => void;
};

export function useSendwyreCheckout({ publicAddress }: Props): Result {
  const startCheckout = useCallback(async () => {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        authorization: `Bearer ${process.env.NEXT_PUBLIC_SENDWYRE_API_KEY}`,
      },
      body: JSON.stringify({
        referrerAccountId: `${Config.SENDWYRE_ACCOUNT_ID}`,
        sourceCurrency: "USD",
        destCurrency: "XLM",
        dest: `stellar:${publicAddress}`,
        redirectUrl: `${Config.APP_URL}/dashboard/profile`,
      }),
    };

    const result = await fetch(`${Config.SENDWYRE_API}/orders/reserve`, options)
      .then((response) => response.json())
      .catch((err) => console.error(err));

    Linking.openURL(result.url);
  }, [publicAddress]);

  return { startCheckout };
}
