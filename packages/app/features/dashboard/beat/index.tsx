import { useBeatParam } from "app/hooks/param/useBeatParam";
import { tw } from "app/design-system/tailwind";
import { Entry, useEntryDetailsQuery } from "app/api/graphql";
import { ScrollView } from "app/design-system/ScrollView";
import { Image, View } from "app/design-system";
import { Activity } from "./BeatActivities";
import { Details } from "./BeatDetails";
import { imageSrc, imageUrlMedium } from "app/utils/entry";
import { BeatSummaryColumn } from "./BeatSummaryColumn";
import { useGetEntry } from "app/hooks/algolia/useGetEntry";
import * as assert from "assert";
import { ReactNode, useEffect } from "react";
import BeatPageSkeleton from "app/ui/skeletons/BeatPageSkeleton";
import { Owners } from "./BeatOwners";
import {
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { SkeletonContainer } from "app/ui/skeletons/SkeletonContainer";

type Props = {
  entry?: Entry;
  children?: ReactNode;
};

export default function BeatScreen(props: Props) {
  const id = useBeatParam();
  assert.ok(id !== undefined);
  const getEntryResult = useGetEntry({ id, skip: props.entry !== undefined });
  const { data } = useEntryDetailsQuery({
    variables: { id: id! },
    skip: !id,
  });

  const x = useSharedValue(-0.2);

  useEffect(() => {
    x.value = withRepeat(withTiming(1.2, { duration: 1000 }), -1);
  }, []);

  const entry = props.entry ?? getEntryResult.entry;
  const details = data?.entry;

  if (!entry) {
    return <BeatPageSkeleton />;
  }

  const Content = () => {
    if (tw.prefixMatch("md")) {
      return (
        <>
          <View className="flex-row w-full">
            <View className="flex flex-1 mr-2 items-center">
              <Image
                uri={imageUrlMedium(entry.imageUrl)}
                fallbackUri={imageSrc(entry.imageUrl)}
                className="aspect-square max-w-125 max-h-125 w-full"
              />

              <Details code={entry.code} issuer={entry.issuer} />
              {details?.holders && <Owners holders={details.holders} />}
            </View>
            <BeatSummaryColumn entry={entry} holders={details?.holders} />
          </View>
          {!details && (
            <SkeletonContainer
              sharedValue={x}
              className="mt-5 rounded-lg h-50 w-full"
            />
          )}
          {details?.history && <Activity activities={details.history} />}
        </>
      );
    } else {
      return (
        <>
          <Image
            uri={imageUrlMedium(entry.imageUrl)}
            fallbackUri={imageSrc(entry.imageUrl)}
            className="aspect-square max-w-125 max-h-125 w-full mb-3"
          />
          <BeatSummaryColumn entry={entry} holders={details?.holders} />
          <Details code={entry.code} issuer={entry.issuer} />
          {!details && (
            <SkeletonContainer
              sharedValue={x}
              className="mt-5 rounded-lg h-20 w-full"
            />
          )}
          {details?.holders && <Owners holders={details.holders} />}

          {details?.history && <Activity activities={details.history} />}
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
