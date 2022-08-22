import React from "react"
import { useAuthStatus } from "app/hooks/useAuthStatus"

/// for native we'll keep most of the logic inside navigator file
/// so here we're just calling this hook
export function AuthProvider({ children }: { children: React.ReactNode }) {
  useAuthStatus()
  return <>{children}</>
}
