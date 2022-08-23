import { SignInParam } from "app/hooks/use-sign-in-param"
import { ActivityIndicator, Text, View } from "app/design-system"
import { useMutation } from "@apollo/client"
import { UserData } from "app/models"
import { SIGN_IN } from "app/api/user"
import { useEffect } from "react"
import { useLogIn } from "app/hooks/useLogIn"

export function AuthenticationView({
  signInParam,
}: {
  signInParam: SignInParam
}) {
  const [signIn, { data, error }] = useMutation<{ signIn: UserData }>(SIGN_IN)
  const logIn = useLogIn()

  useEffect(() => {
    signIn({
      variables: {
        signedXDR: "",
        uid: signInParam.uid,
        token: signInParam.token,
      },
    })
  }, [signInParam, signIn])

  useEffect(() => {
    if (data) {
      logIn(data.signIn)
    }
  }, [data, logIn])

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
  )
}
