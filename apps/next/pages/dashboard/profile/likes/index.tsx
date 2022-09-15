import React from "react";
import { AuthGuard } from "app/utils/authGuard";
import LikesScreen from "app/features/dashboard/profile/likes";

export default function LikesPage() {
  return (
    <AuthGuard>
      <LikesScreen />
    </AuthGuard>
  );
}
