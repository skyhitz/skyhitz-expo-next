import { ReactNode, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userAtom } from "app/state/user";
import { useRouter } from "solito/router";
import { SplashScreen } from "app/features/splash/splashScreen";

export function AuthGuard({ children }: { children: ReactNode }) {
  const user = useRecoilValue(userAtom);
  const { push } = useRouter();

  useEffect(() => {
    if (!user) {
      push("/");
    }
  }, [user, push]);

  // if auth with a valid user show protected page
  if (user) {
    return <>{children}</>;
  }

  /* otherwise don't return anything, will do a redirect from useEffect */
  return <SplashScreen />;
}
