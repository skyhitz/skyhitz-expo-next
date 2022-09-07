import { AuthGuard } from "app/utils/authGuard";
import EditProfileScreen from "app/features/edit-profile";
import React from "react";

export default function EditProfilePage() {
  return (
    <AuthGuard>
      <EditProfileScreen />
    </AuthGuard>
  );
}
