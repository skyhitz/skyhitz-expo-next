import { User } from '../models';
import {
  getAuthenticatedUser,
  requestToken,
  signIn as sendSignIn,
  signUp as sendSignUp,
} from '../api/user';
import { SignUpForm } from '../types';
import { userAtom } from '../atoms/atoms';
import { useRecoilState } from 'recoil';

export const SessionStore = () => {
  const [user, setUser] = useRecoilState(userAtom);

  async function signUp(payload: SignUpForm) {
    let userPayload = await sendSignUp(payload);
    return setUser(new User(userPayload));
  }

  async function signIn(token?: string, uid?: string, xdr = '') {
    let userPayload = await sendSignIn(token, uid, xdr);
    if (userPayload) {
      return setUser(new User(userPayload));
    }
    return null;
  }

  // public forceSignOutDisposer = observe(forceSignOut, ({ object }) => {
  //   if (object.value) {
  //     this.signOut();
  //   }
  // });

  async function signOut() {
    return setUser(null);
  }

  async function refreshUser() {
    try {
      let userPayload = await getAuthenticatedUser();
      if (userPayload) {
        let userPayloadClone = Object.assign({}, userPayload);
        userPayloadClone.jwt = user?.jwt;
        setUser(new User(userPayloadClone));
        return user;
      }
    } catch (e) {
      console.info(e);
    }
    return await signOut();
  }

  return { requestToken, signUp, signIn, signOut, refreshUser, user };
};
