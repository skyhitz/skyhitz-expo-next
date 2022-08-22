import { SignInParam } from 'app/hooks/use-sign-in-param'
import { useSignIn } from 'app/hooks/use-sign-in'
import { Text, View } from 'app/design-system'

export function AuthenticationView({
  signInParam,
}: {
  signInParam: SignInParam
}) {
  const { user, error } = useSignIn(signInParam)

  return (
    <View className="w-72">
      <Text className="text-center align-center text-sm w-full rounded-lg p-3 bg-gray-700/20">
        {user ? 'Success' : 'Authentication...'}
      </Text>
      {error && (
        <Text className="w-full text-center text-sm text-[#d9544f] mt-4 min-h-5">
          {error.message}
        </Text>
      )}
    </View>
  )
}
