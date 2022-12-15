import { View } from "app/design-system";
import { useEffect } from "react";
import { SkeletonContainer } from "./SkeletonContainer";
import {
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export function BeatSkeleton() {
  const x = useSharedValue(-0.2);

  useEffect(() => {
    x.value = withRepeat(withTiming(1.2, { duration: 1000 }), -1);
  }, []);

  const EntrySkeleton = () => {
    return (
      <View className="flex-row w-full h-20 m-2 items-start">
        <SkeletonContainer className="w-15 h-15" sharedValue={x} />
        <SkeletonContainer className="h-5 flex-1 mx-5" sharedValue={x} />
      </View>
    );
  };
  return (
    <>
      {Array(8)
        .fill(true)
        .map((_, i) => (
          <EntrySkeleton key={i} />
        ))}
    </>
  );
}
