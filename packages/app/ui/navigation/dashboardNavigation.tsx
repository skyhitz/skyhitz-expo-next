import { View } from "app/design-system";
import Navbar from "app/ui/navbar";
import { tw } from "app/design-system/tailwind";
import DashboardTabBar from "app/ui/navigation/dashboardTabBar";
import React from "react";
import { PlayerBar } from "app/features/player/playerBar";
import { MobileTabBarWrapper } from "./mobileTabBarWrapper";
import { useRecoilValue } from "recoil";
import { userAtom } from "app/state/user";
import { useSx } from "dripsy";
import { useNextRouter } from "solito/build/router/use-next-router";

export function DashboardNavigation({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useNextRouter();
  const route = router?.route || "";
  const currentTabName = route.split("/").at(-1) || "";

  useSx();
  const user = useRecoilValue(userAtom);
  return (
    <View
      className="flex flex-1 bg-blue-dark overflow-hidden"
      sx={{ maxHeight: "100vh" }}
    >
      {tw.prefixMatch("sm") && <Navbar />}
      <View className="flex flex-row flex-1">
        {!!user && tw.prefixMatch("sm") && (
          <DashboardTabBar currentTabName={currentTabName} column />
        )}
        {children}
      </View>
      {tw.prefixMatch("sm") && <PlayerBar />}
      {!tw.prefixMatch("sm") && (
        <MobileTabBarWrapper currentTabName={currentTabName} />
      )}
    </View>
  );
}
