import { SignInParam } from 'app/hooks/use-sign-in-param'
import { useSignIn } from 'app/hooks/use-sign-in'
import { ActivityIndicator, Text, View } from 'app/design-system'

export function AuthenticationView({
  signInParam,
}: {
  signInParam: SignInParam
}) {
  const { user, error } = useSignIn(signInParam)

  return (
    <View className="w-72 flex items-center">
      {!user && !error && (
        <>
          <ActivityIndicator size={'large'} />
          <Text className="text-lg text-center mt-2">Authentication</Text>
        </>
      )}
      {error && !user && (
        <Text className="w-full text-center text-[#d9544f] text-lg">
          {error.message}
        </Text>
      )}
      {user && <Text className="text-lg w-full text-center">Success!</Text>}
    </View>
  )
}
