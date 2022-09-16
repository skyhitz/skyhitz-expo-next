import React from "react";
import { MintScreen } from "app/features/dashboard/profile/mint/MintScreen";
import { AuthGuard } from "app/utils/authGuard";

export default function ProfilePage() {
  return (
    <AuthGuard>
      <MintScreen />
    </AuthGuard>
  );
}
