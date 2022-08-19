import { SignInParam } from 'app/hooks/use-sign-in-param'
import { useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { SIGN_IN } from 'app/api/user'
import { User } from 'app/models'

export const useSignIn = (
  param: SignInParam | undefined,
  onSignedIn: (user: User) => void
) => {
  const [signIn, { loading }] = useMutation<User>(SIGN_IN)

  useEffect(() => {
    if (!param || loading) return
    signIn({
      variables: {
        signedXDR: '',
        uid: param.uid,
        token: param.token,
      },
    })
      .then((d) => d.data && onSignedIn(d.data))
      .catch((e) => console.log(e))
  }, [param])
}
