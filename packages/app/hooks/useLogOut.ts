import { useSetRecoilState } from "recoil";
import { userAtom } from "app/state/user";
import { SecureStorage } from "app/utils/secure-storage";

export default function useLogOut(): () => void {
  const setUserData = useSetRecoilState(userAtom);

  const logOut = async () => {
    setUserData(null);
    await SecureStorage.clear("token");
  };

  return logOut;
}
