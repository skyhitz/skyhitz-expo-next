import React from "react";
import { ProfileScreen } from "app/features/dashboard/profile";
import { AuthGuard } from "app/utils/authGuard";

export default function ProfilePage() {
  return (
    <AuthGuard>
      <ProfileScreen />
    </AuthGuard>
  );
}
