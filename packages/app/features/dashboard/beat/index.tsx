import { useBeatParam } from "app/hooks/param/useBeatParam";
import { tw } from "app/design-system/tailwind";
import { Entry, useEntryDetailsQuery } from "app/api/graphql";
import { ScrollView } from "app/design-system/ScrollView";
import { ActivityIndicator, Image, View } from "app/design-system";
import { Activity } from "./BeatActivities";
import { Details } from "./BeatDetails";
import { imageSrc, imageUrlMedium } from "app/utils/entry";
import { BeatSummaryColumn } from "./BeatSummaryColumn";
import { useGetEntry } from "app/hooks/algolia/useGetEntry";
import * as assert from "assert";
import { ReactNode } from "react";

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
  if (!entry) {
    // TODO skeletons
    return (
      <View className="flex-1 flex items-center justify-center bg-blue-dark">
        <ActivityIndicator />
      </View>
    );
  }

  const Content = () => {
    const { issuer, code, imageUrl } = entry;
    assert.ok(issuer && code && imageUrl);
    if (tw.prefixMatch("md")) {
      return (
        <>
          <View className="flex-row w-full">
            <View className="flex flex-1 mr-2 items-center justify-between">
              <Image
                uri={imageUrlMedium(imageUrl)}
                fallbackUri={imageSrc(imageUrl)}
                className="aspect-square max-w-125 max-h-125 w-full"
              />
              <Details code={code} issuer={issuer} />
            </View>
            <BeatSummaryColumn entry={entry} holders={details?.holders} />
          </View>
          {/* TODO skeleton */}
          {!details && <ActivityIndicator className="mt-5 mx-auto" />}
          {details?.history && <Activity activities={details.history} />}
        </>
      );
    } else {
      return (
        <>
          <Image
            uri={imageUrlMedium(imageUrl)}
            fallbackUri={imageSrc(imageUrl)}
            className="aspect-square max-w-125 max-h-125 w-full mb-3"
          />
          <BeatSummaryColumn entry={entry} holders={details?.holders} />
          <Details code={code} issuer={issuer} />
          {/* TODO skeleton */}
          {!details && <ActivityIndicator className="mt-5 mx-auto" />}
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
