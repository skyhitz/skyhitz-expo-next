import { useSetRecoilState } from "recoil";
import { userAtom } from "app/state/atoms";
import { SecureStorage } from "app/utils/secure-storage";
import { User } from "app/api/graphql";

export function useLogIn(): (_: User) => void {
  const setUserData = useSetRecoilState(userAtom);

  const logIn = async (user: User) => {
    setUserData(user);
    if (user.jwt) {
      await SecureStorage.save("token", user.jwt!);
    }
  };

  return logIn;
}
