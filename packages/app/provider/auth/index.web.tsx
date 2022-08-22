import React, { useEffect } from "react"
import { useLogIn } from "app/hooks/useLogIn"
import { useAuthStatus } from "app/hooks/useAuthStatus"
import { SplashScreen } from "app/features/splash/splash-screen"
import { useRecoilValue } from "recoil"
import { appInitializedAtom, userAtom } from "app/state/atoms"
import { useRouter } from "solito/router"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  useAuthStatus()
  const initialized = useRecoilValue(appInitializedAtom)
  const user = useRecoilValue(userAtom)
  const { push } = useRouter()

  useEffect(() => {
    if (user) {
      push("/dashboard/search")
    }
  }, [user, push])

  if (!initialized) {
    return <SplashScreen />
  }

  return <>{children}</>
}
