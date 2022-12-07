import React from "react";
import { AuthGuard } from "app/utils/authGuard";
import BidsScreen from "app/features/dashboard/profile/bids/index";

export default function BidsPage() {
  return (
    <AuthGuard>
      <BidsScreen />
    </AuthGuard>
  );
}
