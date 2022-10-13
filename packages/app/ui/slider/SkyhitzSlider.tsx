import { View } from "app/design-system";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { useMemo, useState } from "react";
import { tw } from "app/design-system/tailwind";

export function SkyhitzSlider() {
  const [sliderWidth, setSliderWidth] = useState<number>(0);
  const [sliderHeight, setSliderHeight] = useState<number>(0);

  const x = useSharedValue(0);
  const dragStart = useSharedValue(0);

  const panGestureHandler = useMemo(
    () =>
      Gesture.Pan()
        .onStart((_) => {
          dragStart.value = x.value;
        })
        .onUpdate((event) => {
          x.value = Math.min(
            sliderWidth,
            Math.max(0, dragStart.value + event.translationX)
          );
        })
        .onEnd((event) => {
          console.log(event);
        })
        .hitSlop(10),
    [sliderWidth, dragStart]
  );

  const tapGestureHandler = useMemo(
    () =>
      Gesture.Tap()
        .onTouchesDown((e) => {
          x.value = e.allTouches[0]?.x ?? x.value;
        })
        .hitSlop(10),
    []
  );

  const gestureHandler = useMemo(
    () => Gesture.Simultaneous(tapGestureHandler, panGestureHandler),
    [tapGestureHandler, panGestureHandler]
  );

  const sliderStyle = useAnimatedStyle(() => {
    return {
      width: x.value,
    };
  });

  const thumbStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: x.value - sliderHeight / 2,
        },
      ],
    };
  }, [sliderHeight]);

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
