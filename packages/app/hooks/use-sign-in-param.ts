import { createParam } from "solito";
import { useMemo } from "react";

export type SignInParam = {
  token: string;
  uid: string;
};

const { useParam } = createParam<SignInParam>();

export const useSignInParam = (): SignInParam | undefined => {
  const [token] = useParam("token");
  const [uid] = useParam("uid");

  return useMemo(() => {
    if (token && uid) return { token, uid };
  }, [token, uid]);
};
