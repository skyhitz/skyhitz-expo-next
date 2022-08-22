import { useEffect } from "react";
import { SecureStorage } from "app/utils/secure-storage";
import { useLazyQuery } from "@apollo/client";
import { GET_USER } from "app/api/user";
import { useSetRecoilState } from "recoil";
import { appInitializedAtom, userAtom } from "app/state/atoms";

export function useAuthStatus() {
  const [getUserLazy, { error, data }] = useLazyQuery(GET_USER);
  const setInitialized = useSetRecoilState(appInitializedAtom);
  const setUser = useSetRecoilState(userAtom);

  useEffect(() => {
    if (data || error) {
      setInitialized(true);
    }

    if (data) {
      setUser(data?.authenticatedUser);
    }

    if (error) {
      const removeToken = async () => {
        await SecureStorage.clear("token")
      }
      removeToken()
    }
  }, [data, error, setInitialized, setUser]);

  useEffect(() => {
    const checkToken = async () => {
      const token = await SecureStorage.get("token");
      if (token) {
        // check if token is valid
        getUserLazy();
      } else {
        setInitialized(true);
      }
    };
    checkToken();
  }, [getUserLazy, setInitialized]);
}
