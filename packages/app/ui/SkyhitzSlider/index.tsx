import { View } from "app/design-system";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnUI,
  runOnJS,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { useEffect, useMemo, useState } from "react";
import { tw } from "app/design-system/tailwind";

type Props = {
  minimumValue: number;
  maximumValue: number;
  value: number;
  onSlidingStart?: () => void;
  onValueChange?: (newValue: number) => void;
  onSlidingComplete?: (newValue: number) => void;
};

export function SkyhitzSlider({
  minimumValue,
  maximumValue,
  value,
  onSlidingStart,
  onValueChange,
  onSlidingComplete,
}: Props) {
  const [sliderWidth, setSliderWidth] = useState<number>(0);
  const [sliderHeight, setSliderHeight] = useState<number>(0);
  const x = useSharedValue(0);
  const dragStart = useSharedValue(x.value);
  const isSliding = useSharedValue(false);

  useEffect(() => {
    const worklet = (num: number) => {
      "worklet";
      if (!isSliding.value) {
        x.value = num;
      }
    };
    const num = value / (maximumValue - minimumValue);
    if (!isNaN(num)) {
      runOnUI(worklet)(num);
    }
  }, [value, maximumValue, minimumValue]);

  const panGestureHandler = useMemo(
    () =>
      Gesture.Pan()
        .onStart(() => {
          dragStart.value = x.value * sliderWidth;
        })
        .onUpdate((event) => {
          x.value =
            Math.min(
              sliderWidth,
              Math.max(0, dragStart.value + event.translationX)
            ) / sliderWidth;
          if (onValueChange) {
            runOnJS(onValueChange)(x.value * (maximumValue - minimumValue));
          }
        })
        .onEnd(() => {
          isSliding.value = false;
          if (onSlidingComplete) {
            runOnJS(onSlidingComplete)(x.value * (maximumValue - minimumValue));
          }
        })
        .hitSlop(10),
    [
      sliderWidth,
      dragStart,
      maximumValue,
      minimumValue,
      onSlidingComplete,
      onValueChange,
    ]
  );

  const tapGestureHandler = useMemo(
    () =>
      Gesture.Tap()
        .onTouchesDown((event) => {
          if (event.allTouches[0]) {
            isSliding.value = true;
            x.value = event.allTouches[0].x / sliderWidth;
            if (onValueChange) {
              runOnJS(onValueChange)(x.value * (maximumValue - minimumValue));
            }
            if (onSlidingStart) {
              runOnJS(onSlidingStart)();
            }
          }
        })
        .onTouchesUp(() => {
          isSliding.value = false;
          if (onSlidingComplete) {
            runOnJS(onSlidingComplete)(x.value * (maximumValue - minimumValue));
          }
        })
        .hitSlop(10),
    [
      sliderWidth,
      maximumValue,
      minimumValue,
      onValueChange,
      onSlidingComplete,
      onSlidingStart,
    ]
  );

  const gestureHandler = useMemo(
    () => Gesture.Simultaneous(tapGestureHandler, panGestureHandler),
    [tapGestureHandler, panGestureHandler]
  );

  const sliderStyle = useAnimatedStyle(() => {
    return {
      width: x.value * sliderWidth,
    };
  }, [sliderWidth]);

  console.log(sliderStyle);

  const thumbStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: x.value * sliderWidth - sliderHeight / 2,
        },
      ],
    };
  }, [sliderHeight, sliderWidth]);

  return (
    <GestureDetector gesture={gestureHandler}>
      <View
        className="flex-1 flex-row rounded-md max-h-2 min-h-2"
        onLayout={(e) => {
          setSliderWidth(e.nativeEvent.layout.width);
          setSliderHeight(e.nativeEvent.layout.height);
        }}
      >
        <Animated.View
          style={[tw.style("max-h-2 min-h-2 rounded-l-md"), sliderStyle]}
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
