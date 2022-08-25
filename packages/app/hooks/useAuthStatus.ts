import { useEffect, useState } from "react";
import { SecureStorage } from "app/utils/secure-storage";
import { useSetRecoilState } from "recoil";
import { appInitializedAtom, userAtom } from "app/state/atoms";
import { useAuthenticatedUserQuery, User } from "app/api/graphql";

type Props = {
  onUserAuth?: () => void;
};
// checks if there is saved token and fetch user if possible
export function useAuthStatus(options?: Props) {
  const setInitialized = useSetRecoilState(appInitializedAtom);
  const setUser = useSetRecoilState(userAtom);
  const [skipQuery, setSkipQuery] = useState<boolean>(true);
  const onUserAuthenticated = (data: { authenticatedUser: User }) => {
    setUser(data?.authenticatedUser);
    options?.onUserAuth?.call(null);
    setInitialized(true);
    setSkipQuery(true);
  };

  const onAuthError = async () => {
    setInitialized(true);
    setSkipQuery(true);
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
      }
    };
    checkToken();
  }, [setInitialized, setSkipQuery]);
}
