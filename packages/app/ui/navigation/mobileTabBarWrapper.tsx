import { View } from "app/design-system";
import DashboardTabBar from "app/ui/navigation/dashboardTabBar";
import React, { useCallback, useMemo } from "react";
import { MiniPlayerBar } from "app/features/player/miniPlayerBar";
import { FullScreenPlayer } from "app/features/player/fullScreenPlayer";
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  withSpring,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import { Dimensions } from "react-native";
import { useSafeArea } from "app/provider/safe-area/useSafeArea";

const springAnimationConfig = {
  damping: 60,
  stiffnes: 150,
  restDisplacementThreshold: 0.1,
};

const { height } = Dimensions.get("window");
const miniPlayerHeight = 40;

export function MobileTabBarWrapper() {
  const y = useSharedValue(0);
  const insets = useSafeArea();
  const tabBarHeight = useMemo(() => 54 + insets.bottom, [insets]); // 52 + 2 border
  const maxYTranslation = useMemo(
    () => height - miniPlayerHeight - tabBarHeight,
    [tabBarHeight]
  );

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: { startX: number }) => {
      ctx.startX = y.value;
    },
    onActive: (event, ctx: { startX: number }) => {
      y.value = Math.max(
        -maxYTranslation,
        Math.min(0, ctx.startX + event.translationY)
      );
    },
    onEnd: (event) => {
      console.log(y.value, event.velocityY);
      const animateTo = y.value < -maxYTranslation / 2 ? -maxYTranslation : 0;
      y.value = withSpring(animateTo, springAnimationConfig);
    },
  });

  const draggableStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: y.value,
        },
      ],
    };
  });

  const playerBarStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      y.value,
      [0, -maxYTranslation / 3],
      [1, 0],
      Extrapolation.CLAMP
    );
    return {
      opacity,
    };
  });

  const tabBarStyle = useAnimatedStyle(() => {
    const translation = interpolate(
      y.value,
      [0, -maxYTranslation],
      [0, tabBarHeight],
      Extrapolation.CLAMP
    );
    return {
      transform: [
        {
          translateY: translation,
        },
      ],
    };
  });

  const fullScreenPlayerStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      y.value,
      [0, -maxYTranslation / 5],
      [0, 1],
      Extrapolation.CLAMP
    );
    return {
      opacity,
    };
  });

  const onExpand = useCallback(() => {
    y.value = withSpring(-maxYTranslation, springAnimationConfig);
  }, [y, maxYTranslation]);

  const onHide = useCallback(() => {
    y.value = withSpring(0, springAnimationConfig);
  }, [y]);

  return (
    <View className="flex bg-blue-dark">
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={draggableStyle}>
          <MiniPlayerBar
            onTogglePress={onExpand}
            animatedStyle={playerBarStyle}
          />
          <Animated.View style={fullScreenPlayerStyle}>
            <FullScreenPlayer onTogglePress={onHide} />
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
      <Animated.View style={[{ zIndex: 10 }, tabBarStyle]}>
        <DashboardTabBar />
      </Animated.View>
    </View>
  );
}
