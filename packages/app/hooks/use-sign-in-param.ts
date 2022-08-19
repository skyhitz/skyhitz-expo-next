import { createParam } from 'solito'

export type SignInParam = {
  token: string
  uid: string
}

const { useParam } = createParam<SignInParam>()

export const useSignInParam = (): SignInParam | undefined => {
  const [token] = useParam('token')
  const [uid] = useParam('uid')

  if (token && uid) {
    return { token, uid }
  }
}
