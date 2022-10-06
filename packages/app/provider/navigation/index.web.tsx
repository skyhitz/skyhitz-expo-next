import React from "react";
import { useAuthStatus } from "app/hooks/useAuthStatus";
import { SplashScreen } from "app/features/splash/splashScreen";
import { useRecoilValue } from "recoil";
import { appInitializedAtom } from "app/state/user";

export const NavigationProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  useAuthStatus();
  const initialized = useRecoilValue(appInitializedAtom);

  if (!initialized) {
    // if the app is initializing, return splash screen
    return <SplashScreen />;
  }
  return <>{children}</>;
};
