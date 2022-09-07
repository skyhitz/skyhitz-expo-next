import { AuthGuard } from "app/utils/authGuard";
import EditProfileScreen from "app/features/dashboard/profile/edit";
import React from "react";

export default function EditProfilePage() {
  return (
    <AuthGuard>
      <EditProfileScreen />
    </AuthGuard>
  );
}
