import { tw } from "app/design-system/tailwind";
import { View } from "app/design-system";
import { ScrollView } from "app/design-system/ScrollView";
import { SkeletonContainer } from "./SkeletonContainer";
import {
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";

export default function BeatPageSkeleton() {
  const x = useSharedValue(-0.2);

  useEffect(() => {
    x.value = withRepeat(withTiming(1.2, { duration: 1000 }), -1);
  }, []);

  const Content = () => {
    if (tw.prefixMatch("md")) {
      return (
        <>
          <View className="flex-row w-full">
            <View className="flex flex-1 mr-2 items-center">
              <SkeletonContainer
                className="aspect-square max-w-125 max-h-125 w-full"
                sharedValue={x}
              />
            </View>
            <View className="flex md:flex-1 md:ml-2 w-full">
              <SkeletonContainer className="h-25 mt-5 w-full" sharedValue={x} />
              <SkeletonContainer className="h-25 mt-5 w-full" sharedValue={x} />
              <SkeletonContainer className="h-25 mt-5 w-full" sharedValue={x} />
              <SkeletonContainer className="h-25 mt-5 w-full" sharedValue={x} />
            </View>
          </View>
          <SkeletonContainer className="h-25 mt-4 w-full" sharedValue={x} />
        </>
      );
    } else {
      return (
        <>
          <View className="flex  w-full">
            <SkeletonContainer
              className="aspect-square max-w-125 max-h-125 w-full"
              sharedValue={x}
            />
            <SkeletonContainer className="h-15 mt-5 w-full" sharedValue={x} />
            <SkeletonContainer className="h-15 mt-5 w-full" sharedValue={x} />
            <SkeletonContainer className="h-15 mt-5 w-full" sharedValue={x} />
            <SkeletonContainer className="h-15 mt-5 w-full" sharedValue={x} />
          </View>
        </>
      );
    }
  };

  return (
    <View className="flex-1 flex bg-blue-dark">
      <ScrollView
        contentContainerStyle={tw`flex min-h-full items-start w-full max-w-screen-xl mx-auto p-4 bg-blue-dark`}
      >
        <Content />
      </ScrollView>
    </View>
  );
}
