import { View } from "app/design-system";
import DashboardTabBar from "app/ui/navigation/dashboard-tab-bar";
import React from "react";
import { MiniPlayerBar } from "app/features/player/miniPlayerBar";

export function MobileTabBarWrapper() {
  return (
    <View className="flex flex-column">
      <MiniPlayerBar />
      <DashboardTabBar />
    </View>
  );
}
