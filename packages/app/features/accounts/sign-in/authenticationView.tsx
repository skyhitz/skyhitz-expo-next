import { SignInParam } from "app/hooks/useSignInParam";
import { ActivityIndicator, Text, View } from "app/design-system";
import { useEffect } from "react";
import { useLogIn } from "app/hooks/useLogIn";
import { useSignInWithTokenMutation } from "app/api/graphql";

export function AuthenticationView({
  signInParam,
}: {
  signInParam: SignInParam;
}) {
  const [signIn, { data, error }] = useSignInWithTokenMutation();
  const logIn = useLogIn();

  useEffect(() => {
    signIn({
      variables: {
        uid: signInParam.uid,
        token: signInParam.token,
      },
    });
  }, [signInParam, signIn]);

  useEffect(() => {
    if (data?.signInWithToken) {
      logIn(data.signInWithToken);
    }
  }, [data, logIn]);

  return (
    <View className="w-72 flex items-center">
      {error ? (
        <Text className="w-full text-center text-[#d9544f] text-lg">
          {error.message}
        </Text>
      ) : (
        <>
          <ActivityIndicator size={"large"} />
          <Text className="text-lg text-center mt-2">Authentication</Text>
        </>
      )}
    </View>
  );
}
