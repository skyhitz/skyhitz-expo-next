import { SignInParam } from 'app/hooks/use-sign-in-param'
import { ActivityIndicator, Text, View } from 'app/design-system'
import { useMutation } from '@apollo/client'
import { UserData } from 'app/models'
import { SIGN_IN } from 'app/api/user'
import { useEffect } from 'react'

export function AuthenticationView({
  signInParam,
}: {
  signInParam: SignInParam
}) {
  const [signIn, { data: user, error }] = useMutation<UserData>(SIGN_IN)

  useEffect(() => {
    signIn({
      variables: {
        signedXDR: '',
        uid: signInParam.uid,
        token: signInParam.token,
      },
    })
  }, [signInParam, signIn])

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
