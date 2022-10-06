import { useSetRecoilState } from "recoil";
import { userAtom } from "app/state/user";
import { SecureStorage } from "app/utils/secure-storage";
import { useRouter } from "solito/router";

export default function useLogOut(): () => void {
  const setUserData = useSetRecoilState(userAtom);
  const { push } = useRouter();

  const logOut = async () => {
    setUserData(null);
    push("/");
    await SecureStorage.clear("token");
  };

  return logOut;
}
