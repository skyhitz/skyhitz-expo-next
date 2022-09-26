import { useSignInWithXdrMutation } from "app/api/graphql";
import { ActivityIndicator, Button, Text, View } from "app/design-system";
import useErrorReport from "app/hooks/useErrorReport";
import { useLogIn } from "app/hooks/useLogIn";
import { useWalletConnectClient } from "app/provider/WalletConnect";
import { buildTransactionForAuth } from "app/utils/stellar";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "solito/router";

type Props = {
  publicKey: string;
};
export function WalletConnectView({ publicKey }: Props) {
  const { signXdr } = useWalletConnectClient();
  const reportError = useErrorReport();
  const [signIn, { loading }] = useSignInWithXdrMutation();
  const logIn = useLogIn();
  const [retryEnabled, setRetryEnabled] = useState<boolean>(false);
  const { back } = useRouter();

  const generateAndSignXdr = useCallback(async () => {
    setRetryEnabled(false);
    try {
      const xdr = await buildTransactionForAuth(publicKey);
      const result = await signXdr(xdr);
      const { signedXDR } = result as { signedXDR: string };
      const { data } = await signIn({ variables: { signedXDR } });
      console.log(data);
      if (data?.signInWithXDR) {
        logIn(data.signInWithXDR);
      }
    } catch (err) {
      setRetryEnabled(true);
      reportError(err, "Error while signing transaction");
    }
  }, [publicKey, signXdr, signIn, reportError, logIn]);

  useEffect(() => {
    generateAndSignXdr();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View className="flex items-center justify-center">
      {loading ? (
        <>
          <ActivityIndicator size="large" />
          <Text className="text-lg text-center mt-2">Authentication</Text>
        </>
      ) : (
        <>
          <Text>Sign auth transaction in your wallet.</Text>
          <Button
            text="Retry"
            onPress={generateAndSignXdr}
            disabled={!retryEnabled}
            className="my-3"
          />
          <Button text="Cancel" onPress={back} variant="secondary" />
        </>
      )}
    </View>
  );
}
