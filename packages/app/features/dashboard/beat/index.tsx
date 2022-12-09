import { useBeatParam } from "app/hooks/param/useBeatParam";
import { tw } from "app/design-system/tailwind";
import { Entry, useEntryDetailsQuery } from "app/api/graphql";
import { ScrollView } from "app/design-system/ScrollView";
import { Image, View } from "app/design-system";
import { Offers } from "./BeatOffers";
import { Activity } from "./BeatActivities";
import { Details } from "./BeatDetails";
import { imageSrc, imageUrlMedium } from "app/utils/entry";
import { BeatSummaryColumn } from "./BeatSummaryColumn";
import { useGetEntry } from "app/hooks/algolia/useGetEntry";
import * as assert from "assert";
import { ReactNode } from "react";
import { BeatSkeleton } from "app/ui/skeletons/BeatSkeleton";

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

  const entry = props.entry ?? getEntryResult.entry;
  const details = data?.entry;

  const Content = () => {
    if (tw.prefixMatch("md")) {
      return (
        <>
          <View className="flex-row w-full">
            <View className="flex flex-1 mr-2 items-center justify-between">
              {!entry && <BeatSkeleton style="image" />}
              {entry && (
                <Image
                  uri={imageUrlMedium(entry.imageUrl)}
                  fallbackUri={imageSrc(entry.imageUrl)}
                  className="aspect-square max-w-125 max-h-125 w-full"
                />
              )}
              {!entry && (
                <BeatSkeleton style="collapsable" secondContainer="w-145" />
              )}
              {entry && <Details code={entry.code} issuer={entry.issuer} />}
            </View>
            <BeatSummaryColumn entry={entry} holders={details?.holders} />
          </View>
          {!details && <BeatSkeleton style="collapsable" />}
          {details?.offers && <Offers offers={details.offers} />}
          {!details && <BeatSkeleton style="collapsable" />}
          {details?.history && <Activity activities={details.history} />}
        </>
      );
    } else {
      return (
        <>
          <View className="flex flex-col w-full">
            {!entry && <BeatSkeleton style="imageMobile" />}
            {entry && (
              <Image
                uri={imageUrlMedium(entry.imageUrl)}
                fallbackUri={imageSrc(entry.imageUrl)}
                className="aspect-square max-w-125 max-h-125 w-full mb-3"
              />
            )}
            <BeatSummaryColumn entry={entry} holders={details?.holders} />
            {!entry && <BeatSkeleton style="collapsableMobile" />}
            {entry && <Details code={entry.code} issuer={entry.issuer} />}
            {!details && <BeatSkeleton style="collapsableMobile" />}
            {details?.offers && <Offers offers={details.offers} />}
            {!details && <BeatSkeleton style="collapsableMobile" />}
            {details?.history && <Activity activities={details.history} />}
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
