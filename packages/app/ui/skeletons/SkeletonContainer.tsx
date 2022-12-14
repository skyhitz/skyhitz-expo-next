import { View } from "app/design-system";
import { tw } from "app/design-system/tailwind";
import Animated, {
  useAnimatedStyle,
  SharedValue,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";

type Props = {
  className?: string;
  sharedValue: SharedValue<number>;
};

export const GRADIENT_WIDTH = 50;

export function SkeletonContainer({ className, sharedValue }: Props) {
  const [width, setWidth] = useState<number>(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: sharedValue.value * width }],
    };
  }, [width]);

  return (
    <View
      className={`bg-grey overflow-hidden rounded-md ${className}`}
      onLayout={(event) => {
        if (!width && event.nativeEvent.layout.width) {
          setWidth(event.nativeEvent.layout.width);
        }
      }}
    >
      <Animated.View style={[animatedStyle, { height: "100%" }]}>
        <LinearGradient
          colors={[
            tw.color("grey")!,
            tw.color("grey-light")!,
            tw.color("grey")!,
          ]}
          locations={[0, 0.5, 1]}
          style={{ height: "100%", width: width * 0.05 }}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
        />
      </Animated.View>
    </View>
  );
}
