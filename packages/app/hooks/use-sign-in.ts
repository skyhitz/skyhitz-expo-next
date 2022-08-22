import { SignInParam } from 'app/hooks/use-sign-in-param'
import { useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { SIGN_IN } from 'app/api/user'
import { UserData } from 'app/models'

export const useSignIn = (param: SignInParam | undefined) => {
  const [signIn, { data, error }] = useMutation<UserData>(SIGN_IN)

  useEffect(() => {
    if (!param) return
    signIn({
      variables: {
        signedXDR: '',
        uid: param.uid,
        token: param.token,
      },
    })
  }, [param, signIn])

  return { user: data, error }
}
