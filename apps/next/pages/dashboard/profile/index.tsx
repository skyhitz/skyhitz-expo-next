import React from "react";
import { ProfileScreen } from "app/features/dashboard/profile";
import { AuthGuard } from "app/utils/auth-guard";

export default function ProfilePage() {
  return (
    <AuthGuard>
      <ProfileScreen />
    </AuthGuard>
  );
}
