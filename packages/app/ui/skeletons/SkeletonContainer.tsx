import { View } from "app/design-system";
import { tw } from "app/design-system/tailwind";
import Animated, {
  useAnimatedStyle,
  SharedValue,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  className?: string;
  sharedValue: SharedValue<number>;
};

export const GRADIENT_WIDTH = 50;

export function SkeletonContainer({ className, sharedValue }: Props) {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: sharedValue.value }],
    };
  }, []);

  return (
    <View className={`bg-grey overflow-hidden rounded-md ${className}`}>
      <Animated.View style={[animatedStyle, { height: "100%" }]}>
        <LinearGradient
          colors={[
            tw.color("grey")!,
            tw.color("grey-light")!,
            tw.color("grey")!,
          ]}
          locations={[0, 0.5, 1]}
          style={{ height: "100%", width: GRADIENT_WIDTH }}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        />
      </Animated.View>
    </View>
  );
}
