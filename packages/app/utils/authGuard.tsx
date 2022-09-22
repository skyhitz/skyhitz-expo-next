import { ReactNode, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userAtom } from "app/state/user";
import { useRouter } from "solito/router";
import { SplashScreen } from "app/features/splash/splashScreen";

type Props = {
  children: ReactNode;
  redirect?: boolean;
  fallback?: () => ReactNode;
};

export function AuthGuard({
  children,
  redirect = true,
  fallback = SplashScreen,
}: Props) {
  const user = useRecoilValue(userAtom);
  const { push } = useRouter();

  useEffect(() => {
    if (!user && redirect) {
      push("/");
    }
  }, [user, push, redirect]);

  // if auth with a valid user show protected stuff
  if (user) {
    return <>{children}</>;
  }

  /* otherwise return fallback, will do a redirect from useEffect */
  return <>{fallback()}</>;
}

export function ComponentAuthGuard({ children }: { children: ReactNode }) {
  return (
    <AuthGuard fallback={() => null} redirect={false}>
      {children}
    </AuthGuard>
  );
}
