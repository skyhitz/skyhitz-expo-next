import { SignInParam } from "app/hooks/param/useSignInParam";
import { ActivityIndicator, Button, Text, View } from "app/design-system";
import { useEffect } from "react";
import { useLogIn } from "app/hooks/useLogIn";
import { useSignInWithTokenMutation } from "app/api/graphql";
import { useRouter } from "solito/router";

export function AuthenticationView({
  signInParam,
}: {
  signInParam: SignInParam;
}) {
  const [signIn, { error }] = useSignInWithTokenMutation();
  const { push } = useRouter();
  const logIn = useLogIn();

  useEffect(() => {
    const trySignIn = async () => {
      try {
        const { data } = await signIn({
          variables: {
            uid: signInParam.uid,
            token: signInParam.token,
          },
        });
        if (data?.signInWithToken) {
          logIn(data.signInWithToken);
        }
      } catch (ex) {
        //no-op
      }
    };
    trySignIn();
  }, [signInParam, signIn, logIn]);

  return (
    <View className="w-72 flex items-center">
      {error ? (
        <>
          <Text className="w-full text-center text-[#d9544f] text-lg">
            {error.message}
          </Text>
          <Button
            text="Go back"
            onPress={() => push("/")}
            className="my-3"
            variant="secondary"
          />
        </>
      ) : (
        <>
          <ActivityIndicator size="large" />
          <Text className="text-lg text-center mt-2">Authentication</Text>
        </>
      )}
    </View>
  );
}
