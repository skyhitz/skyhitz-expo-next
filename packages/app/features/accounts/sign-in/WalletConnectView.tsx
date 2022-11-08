import { useSignInWithXdrMutation } from "app/api/graphql";
import { ActivityIndicator, Button, Text, View } from "app/design-system";
import { useErrorReport } from "app/hooks/useErrorReport";
import { useLogIn } from "app/hooks/useLogIn";
import { useEffect, useState } from "react";
import { useRouter } from "solito/router";

type Props = {
  signedXDR: string;
};
export function WalletConnectView({ signedXDR }: Props) {
  const reportError = useErrorReport();
  const [signIn] = useSignInWithXdrMutation();
  const [isError, setIsError] = useState<boolean>(false);
  const logIn = useLogIn();
  const { back } = useRouter();

  useEffect(() => {
    const trySignIn = async () => {
      try {
        const { data } = await signIn({ variables: { signedXDR } });
        if (data?.signInWithXDR) {
          logIn(data.signInWithXDR);
        }
      } catch (ex) {
        reportError(ex);
        setIsError(true);
      }
    };
    trySignIn();
  }, []);

  return (
    <>
      <View className="flex items-center justify-center">
        {!isError ? (
          <>
            <ActivityIndicator size="large" />
            <Text className="text-lg text-center mt-2">Authentication</Text>
          </>
        ) : (
          <>
            <Button text="Go Back" onPress={back} variant="secondary" />
          </>
        )}
      </View>
    </>
  );
}
