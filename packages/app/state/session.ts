import { User } from '../models'
import {
  getAuthenticatedUser,
  requestToken,
  signIn as sendSignIn,
  signUp as sendSignUp,
} from 'app/api/user'
import { SignUpForm } from 'app/types'
import { userAtom } from 'app/state/atoms'
import { useRecoilState } from 'recoil'

export const SessionStore = () => {
  const [user, setUser] = useRecoilState(userAtom)

  const signUp = async (payload: SignUpForm) => {
    let userPayload = await sendSignUp(payload)
    return setUser(new User(userPayload))
  }

  const signIn = async (token?: string, uid?: string, xdr = '') => {
    let userPayload = await sendSignIn(token, uid, xdr)
    if (userPayload) {
      return setUser(new User(userPayload))
    }
    return null
  }

  const signOut = () => {
    return setUser(null)
  }

  const refreshUser = async () => {
    try {
      let userPayload = await getAuthenticatedUser()
      if (userPayload) {
        let userPayloadClone = Object.assign({}, userPayload)
        userPayloadClone.jwt = user?.jwt
        setUser(new User(userPayloadClone))
        return user
      }
    } catch (e) {
      console.info(e)
    }
    return await signOut()
  }

  return { requestToken, signUp, signIn, signOut, refreshUser, user }
}
