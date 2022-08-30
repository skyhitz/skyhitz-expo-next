import React from "react";
import { SearchScreen } from "app/features/dashboard/search";
import { AuthGuard } from "app/utils/authGuard";

export default function SearchPage() {
  return (
    <AuthGuard>
      <SearchScreen />
    </AuthGuard>
  );
}
