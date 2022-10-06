import { useRouter } from "next/router";

import { useCallback } from "react";
import { useRouter as useSolitoRouter } from "solito/router";

type Result = {
  onAuthRedirect: (auth: boolean) => void;
};

export function useOnAuthRedirect(): Result {
  const { push } = useSolitoRouter();
  const { asPath: path } = useRouter();

  const onAuthRedirect = useCallback(
    (auth: boolean) => {
      if (auth) {
        if (path === "/") {
          push("/dashboard/search");
        } else {
          push(path);
        }
      }
    },
    [push, path]
  );

  return { onAuthRedirect };
}
