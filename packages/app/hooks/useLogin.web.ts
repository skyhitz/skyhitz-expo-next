import { useSetRecoilState } from "recoil";
import { userAtom } from "app/state/user";
import { SecureStorage } from "app/utils/secure-storage";
import { useRouter } from "solito/router";
import { User } from "app/api/graphql";

export function useLogIn(): (user: User) => void {
  const setUserData = useSetRecoilState(userAtom);
  const { push } = useRouter();

  const logIn = async (user: User) => {
    setUserData(user);
    if (user.jwt) {
      await SecureStorage.save("token", user.jwt!);
    }
    push("/dashboard/search");
  };

  return logIn;
}
