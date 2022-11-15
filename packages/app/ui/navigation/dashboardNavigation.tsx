import { View } from "app/design-system";
import Navbar from "app/ui/navbar";
import DashboardTabBar from "app/ui/navigation/dashboardTabBar";
import React, { useMemo } from "react";
import { PlayerBar } from "app/features/player/playerBar";
import { MobileTabBarWrapper } from "./mobileTabBarWrapper";
import { useRecoilValue } from "recoil";
import { userAtom } from "app/state/user";
import { useNextRouter } from "solito/build/router/use-next-router";
import { useWindowSize } from "app/hooks/useWindowSize";

export function DashboardNavigation({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useNextRouter();
  const route = router?.route || "";
  const currentTabName = useMemo(() => route.split("/").at(-1) || "", [route]);
  const { windowHeight, mobileView } = useWindowSize();
  const user = useRecoilValue(userAtom);
  return (
    <View
      className="flex bg-blue-dark overflow-hidden"
      sx={{ height: windowHeight }}
    >
      {!mobileView && <Navbar />}
      <View className="flex flex-row flex-1">
        {!!user && !mobileView && (
          <DashboardTabBar currentTabName={currentTabName} column />
        )}
        {children}
      </View>
      {!mobileView && <PlayerBar />}
      {mobileView && <MobileTabBarWrapper currentTabName={currentTabName} />}
    </View>
  );
}
