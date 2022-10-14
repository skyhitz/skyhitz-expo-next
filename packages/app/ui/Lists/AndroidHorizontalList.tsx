import { ReactElement, useMemo, useState } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDecay,
} from "react-native-reanimated";
import { GestureDetector, Gesture } from "react-native-gesture-handler";
import { tw } from "app/design-system/tailwind";
import { Dimensions } from "react-native";
import { isEmpty } from "ramda";

type Props<T> = {
  data: T[];
  renderItem: (item: T) => ReactElement;
  listEmptyComponent: ReactElement;
};

const { width } = Dimensions.get("window");

export function AndroidHorizontalList<T>({
  data,
  renderItem,
  listEmptyComponent,
}: Props<T>) {
  const [maxTranslation, setMaxTranslation] = useState<number>(0);
  const x = useSharedValue(0);
  const dragStart = useSharedValue(x.value);

  const panGestureHandler = useMemo(
    () =>
      Gesture.Pan()
        .onStart(() => {
          dragStart.value = x.value;
        })
        .onUpdate((event) => {
          x.value = dragStart.value + event.translationX;
        })
        .onEnd((event) => {
          if (x.value > 0) {
            x.value = withSpring(0);
          } else if (x.value < -maxTranslation) {
            x.value = withSpring(-maxTranslation);
          } else {
            x.value = withDecay({
              velocity: event.velocityX,
              clamp: [-maxTranslation, 0],
            });
          }
        })
        .hitSlop(10),
    [maxTranslation, dragStart]
  );

  const listStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: x.value,
        },
      ],
    };
  }, []);

  if (isEmpty(data)) {
    return listEmptyComponent;
  }

  return (
    <GestureDetector gesture={panGestureHandler}>
      <Animated.View
        style={[tw.style("flex-row absolute"), listStyle]}
        onLayout={(e) => {
          setMaxTranslation(
            Math.max(e.nativeEvent.layout.width + 16 - width, 0)
          );
        }}
      >
        {data.map(renderItem)}
      </Animated.View>
    </GestureDetector>
  );
}
