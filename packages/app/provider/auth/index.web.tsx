import React, { useEffect } from "react";
import { useAuthStatus } from "app/hooks/useAuthStatus";
import { SplashScreen } from "app/features/splash/splash-screen";
import { useRecoilValue } from "recoil";
import { appInitializedAtom, userAtom } from "app/state/atoms";
import { useRouter } from "solito/router";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  useAuthStatus();
  const initialized = useRecoilValue(appInitializedAtom);
  const user = useRecoilValue(userAtom);
  const { push } = useRouter();

  useEffect(() => {
    if (user) {
      // redirect to dashboard if the token was correct
      push("/dashboard/search");
    }
  }, [user, push]);

  if (!initialized) {
    // if the app is initializing, return splash screen
    return <SplashScreen />;
  }

  return <>{children}</>;
}
