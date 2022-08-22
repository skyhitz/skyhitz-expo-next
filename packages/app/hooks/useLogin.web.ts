import { UserData } from "app/models/user";
import { useSetRecoilState } from "recoil";
import { userAtom } from "app/state/atoms";
import { SecureStorage } from "app/utils/secure-storage";
import { useRouter } from "solito/router";

export function useLogIn(): (UserData) => void {
  const setUserData = useSetRecoilState(userAtom);
  const { push } = useRouter();

  const logIn = async (user: UserData) => {
    push("/dashboard/search");
    setUserData(user);
    if (user.jwt) {
      await SecureStorage.save("token", user.jwt!);
    }
  };

  return logIn;
}
