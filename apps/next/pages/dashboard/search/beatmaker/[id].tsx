import React from "react";
import { AuthGuard } from "app/utils/authGuard";
import BeatmakerScreen from "app/features/dashboard/beatmaker";

export default function BeatmakerPage() {
  return (
    <AuthGuard>
      <BeatmakerScreen />
    </AuthGuard>
  );
}
