import React from "react"
import { useAuthStatus } from "app/hooks/useAuthStatus"
import { SplashScreen } from "app/features/splash/splash-screen"
import { useRecoilValue } from "recoil"
import { appInitializedAtom } from "app/state/atoms"
import { useRouter } from "solito/router"

export const NavigationProvider = ({
  children,
}: {
  children: React.ReactElement
}) => {
  const { push } = useRouter()
  useAuthStatus({
    onUserAuth: () => {
      push("/dashboard/search")
    },
  })
  const initialized = useRecoilValue(appInitializedAtom)

  if (!initialized) {
    // if the app is initializing, return splash screen
    return <SplashScreen />
  }
  return <>{children}</>
}
