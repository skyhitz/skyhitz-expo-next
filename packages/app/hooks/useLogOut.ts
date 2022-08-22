import { useSetRecoilState } from "recoil";
import { userAtom } from "app/state/atoms";
import { SecureStorage } from "app/utils/secure-storage";

export default function useLogOut(): () => void {
  const setUserData = useSetRecoilState(userAtom);

  const logIn = async () => {
    setUserData(null);
    await SecureStorage.clear("token");
  };

  return logIn;
}
