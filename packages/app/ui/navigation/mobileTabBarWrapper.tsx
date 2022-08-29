import { View } from "app/design-system";
import DashboardTabBar from "app/ui/navigation/dashboard-tab-bar";
import React, { useState } from "react";
import { MiniPlayerBar } from "app/features/player/miniPlayerBar";
import { FullScreenPlayer } from "app/features/player/fullScreenPlayer";
import Animated, { SlideInDown, SlideOutDown } from "react-native-reanimated";

const enteringAnimation = SlideInDown.springify()
  .damping(60)
  .stiffness(150)
  .restDisplacementThreshold(0.1)
  .restDisplacementThreshold(0.1);
const exitingAnimation = SlideOutDown.springify()
  .damping(60)
  .stiffness(150)
  .restDisplacementThreshold(0.1)
  .restDisplacementThreshold(0.1);

export function MobileTabBarWrapper() {
  const [playerVisible, setPlayerVisible] = useState<boolean>(false);

  return (
    <View className="flex flex-column bg-blue-dark">
      {!playerVisible && (
        <Animated.View
          entering={enteringAnimation}
          exiting={exitingAnimation}
          style={{ zIndex: 10 }}
        >
          <MiniPlayerBar onTogglePress={() => setPlayerVisible(true)} />
          <DashboardTabBar />
        </Animated.View>
      )}

      {playerVisible && (
        <Animated.View entering={enteringAnimation} exiting={exitingAnimation}>
          <FullScreenPlayer onTogglePress={() => setPlayerVisible(false)} />
        </Animated.View>
      )}
    </View>
  );
}
