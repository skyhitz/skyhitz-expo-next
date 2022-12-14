import { tw } from "app/design-system/tailwind";
import { View } from "app/design-system";
import { ScrollView } from "app/design-system/ScrollView";
import { SkeletonContainer, GRADIENT_WIDTH } from "./SkeletonContainer";
import {
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useEffect, useState } from "react";

export default function BeatPageSkeleton() {
  const [width, setWidth] = useState<number | undefined>();
  const x = useSharedValue(-GRADIENT_WIDTH);

  useEffect(() => {
    if (width) {
      x.value = withRepeat(withTiming(width, { duration: 1000 }), -1);
    }
  }, [width]);

  const onLayout = (event: any) => {
    if (!width && event.nativeEvent.layout.width) {
      setWidth(event.nativeEvent.layout.width);
    }
  };

  const Content = () => {
    if (tw.prefixMatch("md")) {
      return (
        <>
          <View className="flex-row">
            <View className="flex flex-1 mr-8">
              {/* Image */}
              <View className="w-full items-end" onLayout={onLayout}>
                <SkeletonContainer
                  className="aspect-square w-120 mr-10"
                  sharedValue={x}
                />
              </View>
              {/* Details  */}
              <View className="w-full" onLayout={onLayout}>
                <SkeletonContainer
                  className="h-40 mt-4 w-145"
                  sharedValue={x}
                />
              </View>
            </View>
            {/* Beat summary column */}
            <View className="flex md:flex-1 md:ml-5">
              {/* Description */}
              <View className="w-full" onLayout={onLayout}>
                <SkeletonContainer
                  className="h-25 mt-20 w-full"
                  sharedValue={x}
                />
              </View>
              {/* Likes */}
              <View className="w-full" onLayout={onLayout}>
                <SkeletonContainer
                  className="h-35 mt-4  w-145" //??
                  sharedValue={x}
                />
              </View>
              {/* Owners */}
              <View className="w-full" onLayout={onLayout}>
                <SkeletonContainer
                  className="h-40 mt-4 w-full"
                  sharedValue={x}
                />
              </View>
            </View>
          </View>
          {/*Activity*/}
          <View className="w-full" onLayout={onLayout}>
            <SkeletonContainer
              className="h-25 mt-4 max-w-max"
              sharedValue={x}
            />
          </View>
        </>
      );
    } else {
      return (
        <>
          <View className="flex flex-col w-full">
            <SkeletonContainer sharedValue={x} />
            <View className="flex md:flex-1 md:ml-2 w-full">
              <SkeletonContainer sharedValue={x} />
              <SkeletonContainer sharedValue={x} />

              <SkeletonContainer sharedValue={x} />
              <SkeletonContainer sharedValue={x} />
            </View>
            <SkeletonContainer sharedValue={x} />

            <SkeletonContainer sharedValue={x} />

            <SkeletonContainer sharedValue={x} />
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
