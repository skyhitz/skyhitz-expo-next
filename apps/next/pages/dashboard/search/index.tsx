import React from "react"
import { SearchScreen } from "app/features/dashboard/search"
import { AuthGuard } from "app/utils/auth-guard"

export default function SearchPage() {
  return (
    <AuthGuard>
      <SearchScreen />
    </AuthGuard>
  )
}
