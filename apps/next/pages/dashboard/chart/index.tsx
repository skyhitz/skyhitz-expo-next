import React from "react";
import { ChartScreen } from "app/features/dashboard/chart";
import { AuthGuard } from "app/utils/auth-guard";

export default function ChartPage() {
  return (
    <AuthGuard>
      <ChartScreen />
    </AuthGuard>
  );
}
