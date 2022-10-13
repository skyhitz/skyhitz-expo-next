import { View } from "app/design-system";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  SharedValue,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { useMemo, useState } from "react";
import { tw } from "app/design-system/tailwind";

type Props = {
  minimumValue: number;
  maximumValue: number;
  value: SharedValue<number>;
  onSlidingStart?: () => void;
  onSlidingComplete?: () => void;
};

export function SkyhitzSlider({
  minimumValue,
  maximumValue,
  value: x,
  onSlidingStart,
  onSlidingComplete,
}: Props) {
  const [sliderWidth, setSliderWidth] = useState<number>(0);
  const [sliderHeight, setSliderHeight] = useState<number>(0);
  const dragStart = useSharedValue(x.value);

  const panGestureHandler = useMemo(
    () =>
      Gesture.Pan()
        .onStart((_) => {
          console.log("drag start");
          dragStart.value = x.value * sliderWidth;
        })
        .onUpdate((event) => {
          x.value =
            Math.min(
              sliderWidth,
              Math.max(0, dragStart.value + event.translationX)
            ) / sliderWidth;
        })
        .onEnd((event) => {
          console.log("drag end");
        })
        .hitSlop(10),
    [sliderWidth, dragStart]
  );

  const tapGestureHandler = useMemo(
    () =>
      Gesture.Tap()
        .onTouchesDown((event) => {
          console.log("tap start");
          if (event.allTouches[0]) {
            x.value = event.allTouches[0].x / sliderWidth;
          }
        })
        .onTouchesUp(() => {
          console.log("tap end");
        })
        .hitSlop(10),
    [sliderWidth]
  );

  const gestureHandler = useMemo(
    () => Gesture.Simultaneous(tapGestureHandler, panGestureHandler),
    [tapGestureHandler, panGestureHandler]
  );

  const sliderStyle = useAnimatedStyle(() => {
    return {
      width: (x.value / (maximumValue - minimumValue)) * sliderWidth,
    };
  }, [sliderWidth]);

  const thumbStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX:
            (x.value / (maximumValue - minimumValue)) * sliderWidth -
            sliderHeight / 2,
        },
      ],
    };
  }, [sliderHeight, sliderWidth]);

  return (
    <GestureDetector gesture={gestureHandler}>
      <View
        className="flex-1 flex-row rounded-md bg-blue-track"
        onLayout={(e) => {
          setSliderWidth(e.nativeEvent.layout.width);
          setSliderHeight(e.nativeEvent.layout.height);
        }}
      >
        <Animated.View
          style={[tw.style("h-full rounded-l-md bg-blue"), sliderStyle]}
        />

        <Animated.View
          style={[
            tw.style("h-full rounded-full bg-white absolute"),
            { width: sliderHeight },
            thumbStyle,
          ]}
        />
      </View>
    </GestureDetector>
  );
}
