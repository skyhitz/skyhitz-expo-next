import { useEffect, useState } from "react";
import { SecureStorage } from "app/utils/secure-storage";
import { useSetRecoilState } from "recoil";
import { appInitializedAtom, userAtom } from "app/state/user";
import {
  AuthenticatedUserQuery,
  useAuthenticatedUserQuery,
} from "app/api/graphql";
import { useOnAuthRedirect } from "app/hooks/useOnAuthRedirect";

// checks if there is saved token and fetch user if possible
export function useAuthStatus() {
  const setInitialized = useSetRecoilState(appInitializedAtom);
  const setUser = useSetRecoilState(userAtom);
  const [skipQuery, setSkipQuery] = useState<boolean>(true);
  const { onAuthRedirect } = useOnAuthRedirect();
  const onUserAuthenticated = (data: AuthenticatedUserQuery) => {
    if (data.authenticatedUser) {
      setUser(data?.authenticatedUser);
    }
    setSkipQuery(true);
    setInitialized(true);
    onAuthRedirect(data.authenticatedUser !== undefined);
  };

  const onAuthError = async () => {
    setSkipQuery(true);
    setInitialized(true);
    onAuthRedirect(false);
    // if the token is not valid, remove it from the storage
    await SecureStorage.clear("token");
  };

  // using skip parameter instead of useLazyQuery, because of this issue:
  // https://github.com/apollographql/react-apollo/issues/3505
  useAuthenticatedUserQuery({
    skip: skipQuery,
    onCompleted: onUserAuthenticated,
    onError: onAuthError,
  });

  useEffect(() => {
    const checkToken = async () => {
      const token = await SecureStorage.get("token");
      if (token) {
        // check if token is valid
        setSkipQuery(false);
      } else {
        setInitialized(true);
        onAuthRedirect(false);
      }
    };
    checkToken();
  }, []);
}
