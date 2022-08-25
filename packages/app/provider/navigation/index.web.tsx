import React from "react";
import { useAuthStatus } from "app/hooks/useAuthStatus";
import { SplashScreen } from "app/features/splash/splash-screen";
import { useRecoilValue } from "recoil";
import { appInitializedAtom } from "app/state/atoms";
import { useRouter } from "solito/router";
import { useRouter as useNextRouter} from 'next/router'
import { DashboardNavigation } from 'app/ui/dashboardNavigation'

export function NavigationProvider({
  children,
}: {
  children: React.ReactElement;
}) => {
  const { push } = useRouter();
  useAuthStatus({
    onUserAuth: () => {
      push("/dashboard/search");
    },
  });
  const initialized = useRecoilValue(appInitializedAtom);
  const router = useNextRouter()
  if (!initialized) {
    // if the app is initializing, return splash screen
    return <SplashScreen />;
  }

  const route = router.route
  if (route.includes('dashboard')) {
    return <DashboardNavigation>{children}</DashboardNavigation>
  }
  return <>{children}</>
};
