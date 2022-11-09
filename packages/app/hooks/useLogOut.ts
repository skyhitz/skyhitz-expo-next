import { useSetRecoilState } from "recoil";
import { userAtom } from "app/state/user";
import { SecureStorage } from "app/utils/secure-storage";
import { useRouter } from "solito/router";
import { useApolloClient } from "@apollo/client";

export default function useLogOut(): () => void {
  const setUserData = useSetRecoilState(userAtom);
  const { push } = useRouter();
  const { resetStore } = useApolloClient();

  const logOut = async () => {
    setUserData(null);
    push("/");
    resetStore();
    await SecureStorage.clear("token");
  };

  return logOut;
}
