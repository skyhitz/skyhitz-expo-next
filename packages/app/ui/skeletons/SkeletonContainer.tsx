import { View } from "app/design-system";
import { tw } from "app/design-system/tailwind";
import { useEffect } from "react";
import Animated, {
  useSharedValue,
  withRepeat,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  width: number;
  height: number;
  className?: string;
};

export function SkeletonContainer({ width, height, className }: Props) {
  const x = useSharedValue(-width / 2);

  useEffect(() => {
    x.value = withRepeat(withTiming(width, { duration: 1000 }), -1);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: x.value }],
    };
  });
  return (
    <View
      className={`bg-grey w-${width / 4} h-${
        height / 4
      } overflow-hidden rounded-md ${className}`}
    >
      <Animated.View style={[animatedStyle, {}]}>
        <LinearGradient
          colors={[
            tw.color("grey")!,
            tw.color("grey-light")!,
            tw.color("grey")!,
          ]}
          locations={[0, 0.5]}
          style={{ height, width: width / 2 }}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        />
      </Animated.View>
    </View>
  );
}
