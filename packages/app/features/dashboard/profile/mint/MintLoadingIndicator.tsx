import { View, Text } from "app/design-system";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { tw } from "app/design-system/tailwind";
import { useEffect, useMemo } from "react";
import { min } from "ramda";

type Props = {
  currentStep: number;
  totalSteps: number;
  label: string;
};

const GRADIENT_WIDTH = 25;

export function MintLoadingIndicator({
  currentStep,
  totalSteps,
  label,
}: Props) {
  const CONTAINER_WIDTH = useMemo(() => min(window.innerWidth - 50, 400), []);

  const x = useSharedValue(-GRADIENT_WIDTH);
  const currentWidth = useSharedValue(
    (CONTAINER_WIDTH / totalSteps) * currentStep
  );

  useEffect(() => {
    x.value = withRepeat(
      withTiming(CONTAINER_WIDTH + GRADIENT_WIDTH, { duration: 1000 }),
      -1
    );
  }, []);

  useEffect(() => {
    currentWidth.value = withTiming(
      (CONTAINER_WIDTH / totalSteps) * currentStep,
      {
        duration: 1000,
      }
    );
  }, [currentStep, totalSteps]);

  const gradientStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: x.value }],
    };
  }, []);

  const containerStyle = useAnimatedStyle(() => {
    return {
      width: currentWidth.value,
    };
  }, []);

  return (
    <View className="flex items-center">
      <View
        className={`h-10 border-blue-transparent border-2 rounded overflow-hidden w-${
          CONTAINER_WIDTH / 4
        }`}
      >
        <Animated.View
          style={[
            containerStyle,
            tw.style("h-full overflow-hidden bg-blue-track"),
          ]}
        >
          <Animated.View
            style={[gradientStyle, { height: "100%", width: GRADIENT_WIDTH }]}
          >
            <LinearGradient
              colors={[
                tw.color("blue-track")!,
                tw.color("blue-brand")!,
                tw.color("blue-track")!,
              ]}
              locations={[0, 0.5, 1]}
              style={{ height: "100%", width: GRADIENT_WIDTH }}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
            />
          </Animated.View>
        </Animated.View>
      </View>
      <Text className="mt-3 text-sm font-bold">{label}</Text>
    </View>
  );
}
