import React, { useEffect } from "react"
import { View } from "dripsy"
import useLogIn from "app/hooks/useLogIn"
import { useAuthStatus } from "../hooks/useAuthStatus"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { initialized, user } = useAuthStatus()
  const logIn = useLogIn()

  useEffect(() => {
    if (user) {
      logIn(user)
    }
  }, [user, logIn])

  if (!initialized) {
    // TODO splash screen
    return <View />
  }

  return <>{children}</>
}
