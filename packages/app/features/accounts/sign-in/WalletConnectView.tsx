import { ApolloError } from "@apollo/client";
import { useSignInWithXdrMutation } from "app/api/graphql";
import { ActivityIndicator, Text, View } from "app/design-system";
import { useLogIn } from "app/hooks/useLogIn";
import { useWalletConnectClient } from "app/provider/WalletConnect";
import { buildTransactionForAuth } from "app/utils/stellar";
import { useEffect, useState } from "react";

type Props = {
  publicKey: string;
};
export function WalletConnectView({ publicKey }: Props) {
  const { signXdr } = useWalletConnectClient();
  const [error, setError] = useState<string | undefined>();
  const [signIn, { data, loading }] = useSignInWithXdrMutation();
  const logIn = useLogIn();

  useEffect(() => {
    if (data?.signInWithXDR) {
      logIn(data.signInWithXDR);
    }
  }, [data, logIn]);

  useEffect(() => {
    const generateAndSignXdr = async () => {
      try {
        const xdr = await buildTransactionForAuth(publicKey);
        const result = await signXdr(xdr);
        const { signedXDR } = result as { signedXDR: string };
        await signIn({ variables: { signedXDR } });
      } catch (err) {
        if (err instanceof ApolloError) {
          setError(err.message);
        } else if (typeof err === "string") {
          setError(err);
        } else {
          setError("Error while signing transaction");
        }
      }
    };
    console.log("start");
    generateAndSignXdr();
  }, [publicKey, signXdr, signIn]);

  return (
    <View className="flex items-center justify-content">
      {error ? (
        <Text className="text-red">{error}</Text>
      ) : loading ? (
        <>
          <ActivityIndicator size={"large"} />
          <Text className="text-lg text-center mt-2">Authentication</Text>
        </>
      ) : (
        <Text>Sign auth transaction in your wallet.</Text>
      )}
    </View>
  );
}
