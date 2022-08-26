import { View } from "app/design-system";
import { DashboardNavigation } from "app/ui/dashboard-navigation.web";
import React from "react";
import { useNextRouter } from "solito/build/router/use-next-router";

export function WebNavigation({ children }: { children: React.ReactNode }) {
  const router = useNextRouter();
  const route = router?.route;
  if (route && route.includes("dashboard")) {
    return <DashboardNavigation>{children}</DashboardNavigation>;
  }
  return <View className={"flex flex-1"}>{children}</View>;
}
