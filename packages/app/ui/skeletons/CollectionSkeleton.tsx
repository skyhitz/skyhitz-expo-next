import { View } from "app/design-system";
import { useEffect } from "react";
import { SkeletonContainer } from "./SkeletonContainer";
import {
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

type CollectionSkeletonProps = {
  duplicates: number;
};

export function CollectionSkeleton({ duplicates }: CollectionSkeletonProps) {
  const x = useSharedValue(-0.2);

  useEffect(() => {
    x.value = withRepeat(withTiming(1.2, { duration: 1000 }), -1);
  }, []);

  const EntrySkeleton = () => {
    return (
      <View className="flex-row px-5 w-full max-w-6xl mx-auto my-2">
        <SkeletonContainer className="w-10 h-10" sharedValue={x} />
        <SkeletonContainer className="h-10 flex-1 mx-5 mr-1" sharedValue={x} />
      </View>
    );
  };
  return (
    <>
      {Array(duplicates)
        .fill(true)
        .map((_, i) => (
          <EntrySkeleton key={i} />
        ))}
    </>
  );
}
