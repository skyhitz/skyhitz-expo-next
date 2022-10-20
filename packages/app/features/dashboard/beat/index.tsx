import { useBeatParam } from "app/hooks/param/useBeatParam";
import { tw } from "app/design-system/tailwind";
import { EntryDetails, useEntryQuery } from "app/api/graphql";
import { ScrollView } from "app/design-system/ScrollView";
import { ActivityIndicator, Image, View } from "app/design-system";
import { Offers } from "./BeatOffers";
import { Activity } from "./BeatActivities";
import { Details } from "./BeatDetails";
import { imageSrc, imageUrlMedium } from "app/utils/entry";
import { BeatSummaryColumn } from "./BeatSummaryColumn";

export default function BeatScreen() {
  const id = useBeatParam();
  const { data, loading } = useEntryQuery({
    variables: { id: id! },
    skip: !id,
  });

  if (loading || !data?.entry) {
    return (
      <View className="flex-1 flex items-center justify-center bg-blue-dark">
        <ActivityIndicator />
      </View>
    );
  }

  const Content = ({ entry }: { entry: EntryDetails }) => {
    const { issuer, code, imageUrl } = entry;
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
            <BeatSummaryColumn entryDetails={entry} />
          </View>
          {entry.offers && <Offers offers={entry.offers} />}
          {entry.history && <Activity activities={entry.history} />}
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
          <BeatSummaryColumn entryDetails={entry} />
          <Details code={code} issuer={issuer} />
          {entry.offers && <Offers offers={entry.offers} />}
          {entry.history && <Activity activities={entry.history} />}
        </>
      );
    }
  };

  return (
    <View className="flex-1 flex bg-blue-dark">
      <ScrollView
        contentContainerStyle={tw`flex min-h-full items-start w-full max-w-screen-xl mx-auto p-4 bg-blue-dark`}
      >
        <Content entry={data.entry} />
      </ScrollView>
    </View>
  );
}
