import { View } from "app/design-system";
import { useEffect, useState } from "react";
import { GRADIENT_WIDTH, SkeletonContainer } from "./SkeletonContainer";
import {
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const skeletonStyle = {
  image: "w-full h-20 items-end",
  imageMobile:
    "aspect-square max-w-125 max-h-125 w-full mb-3 items-center justify-center",
  collapsable: "w-full h-5 p-20",
  collapsableMobile: "mt-4 w-full overflow-hidden",
  chart: "flex-row w-full h-20 m-2 items-start",
};

const firstContainerStyle = {
  image: "aspect-square max-w-125 max-h-125 w-full",
  imageMobile: "aspect-square max-w-125 max-h-125 w-full mb-3",
  collapsable: undefined,
  collapsableMobile: undefined,
  chart: "w-15 h-15",
};

const secondContainerStyle = {
  image: undefined,
  imageMobile: undefined,
  collapsable: "h-25 mt-4 w-full",
  collapsableMobile: "h-25 mt-4 w-full",
  chart: "h-5 flex-1 mx-5",
};

const duplicates = {
  image: 1,
  imageMobile: 1,
  collapsable: 1,
  collapsableMobile: 1,
  chart: 8,
};

type Props = {
  style?:
    | "chart"
    | "image"
    | "imageMobile"
    | "collapsable"
    | "collapsableMobile";
  firstContainer?: string;
  secondContainer?: string;
  skeleton?: string;
};

export function BeatSkeleton({
  style = "chart",
  firstContainer,
  secondContainer,
  skeleton,
}: Props) {
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
        className={`${skeletonStyle[style]} ${skeleton}`}
        onLayout={(event) => {
          if (!width && event.nativeEvent.layout.width) {
            setWidth(event.nativeEvent.layout.width);
          }
        }}
      >
        {firstContainerStyle[style] && (
          <SkeletonContainer
            className={`${firstContainerStyle[style]} ${firstContainer}`}
            sharedValue={x}
          />
        )}
        {secondContainerStyle[style] && (
          <SkeletonContainer
            className={`${secondContainerStyle[style]} ${secondContainer}`}
            sharedValue={x}
          />
        )}
      </View>
    );
  };
  return (
    <>
      {Array(duplicates[style])
        .fill(true)
        .map((_, i) => (
          <EntrySkeleton key={i} />
        ))}
    </>
  );
}
