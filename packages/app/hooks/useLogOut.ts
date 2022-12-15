import { useSetRecoilState } from "recoil";
import { userAtom } from "app/state/user";
import { SecureStorage } from "app/utils/secure-storage";
import { useRouter } from "solito/router";
import { useApolloClient } from "@apollo/client";
import { useWalletConnectClient } from "app/provider/WalletConnect";

export default function useLogOut(): () => void {
  const setUserData = useSetRecoilState(userAtom);
  const { push } = useRouter();
  const { resetStore } = useApolloClient();
  const { disconnect } = useWalletConnectClient();

  const logOut = async () => {
    setUserData(null);
    push("/");
    resetStore();
    disconnect();
    await SecureStorage.clear("token");
  };

  return logOut;
}
