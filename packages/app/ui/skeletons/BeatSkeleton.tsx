import { View } from "app/design-system";
import { useEffect, useState } from "react";
import { GRADIENT_WIDTH, SkeletonContainer } from "./SkeletonContainer";
import {
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export function BeatSkeleton() {
  const [width, setWidth] = useState<number | undefined>();
  const x = useSharedValue(-GRADIENT_WIDTH);

  useEffect(() => {
    if (width) {
      x.value = withRepeat(withTiming(width, { duration: 1000 }), -1);
    }
  }, [width]);

  const EntrySkeleton = () => {
    return (
      <View
        className="flex-row w-full h-20 m-2 items-start"
        onLayout={(event) => {
          if (!width && event.nativeEvent.layout.width) {
            setWidth(event.nativeEvent.layout.width);
          }
        }}
      >
        <SkeletonContainer className="w-15 h-15" sharedValue={x} />
        <SkeletonContainer className="h-5 flex-1 mx-5" sharedValue={x} />
      </View>
    );
  };

  return (
    <>
      <EntrySkeleton />
      <EntrySkeleton />
      <EntrySkeleton />
      <EntrySkeleton />
      <EntrySkeleton />
      <EntrySkeleton />
      <EntrySkeleton />
      <EntrySkeleton />
    </>
  );
}
