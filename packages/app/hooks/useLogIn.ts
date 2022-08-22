import { UserData } from "app/models/user";
import { useSetRecoilState } from "recoil";
import { userAtom } from "app/state/atoms";
import { SecureStorage } from "app/utils/secure-storage";

export function useLogIn(): (_: UserData) => void {
  const setUserData = useSetRecoilState(userAtom);

  const logIn = async (user: UserData) => {
    setUserData(user);
    if (user.jwt) {
      await SecureStorage.save("token", user.jwt!);
    }
  };

  return logIn;
}
