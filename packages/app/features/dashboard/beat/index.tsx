import { useBeatParam } from "app/hooks/param/useBeatParam";
import { tw } from "app/design-system/tailwind";
import { EntryDetails, useEntryQuery } from "app/api/graphql";
import { ScrollView } from "app/design-system/ScrollView";
import { ActivityIndicator, Image, View } from "app/design-system";
import { Offers } from "./offers";
import { Activity } from "./activity";
import { Details } from "./BeatDetails";
import { imageSrc } from "app/utils/entry";
import { BeatSummaryColumn } from "./BeatSummaryColumn";

export default function BeatScreen() {
  const id = useBeatParam();
  const { data, loading } = useEntryQuery({
    variables: { id: id! },
    skip: !id,
  });

  if (loading || !data?.entry) {
    return (
      <View className="flex-1 flex items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  }

  const Content = ({ entry }: { entry: EntryDetails }) => {
    const { issuer, code, imageUrl } = entry;
    if (tw.prefixMatch("md")) {
      return (
        <>
          <View className="flex flex-1 mr-2 items-center">
            <Image
              source={{
                uri: imageSrc(imageUrl!),
              }}
              className="aspect-square max-w-125 max-h-125 w-full"
            />
            {entry.offers && <Offers offers={entry.offers} />}
            {entry.history && <Activity activities={entry.history} />}
            <Details code={code} issuer={issuer} />
          </View>
          <BeatSummaryColumn entryDetails={entry} />
        </>
      );
    } else {
      return (
        <>
          <Image
            source={{
              uri: imageSrc(imageUrl!),
            }}
            className="aspect-square max-w-125 max-h-125 w-full mb-3"
          />
          <BeatSummaryColumn entryDetails={entry} />
          {entry.offers && <Offers offers={entry.offers} />}
          {entry.history && <Activity activities={entry.history} />}
          <Details code={code} issuer={issuer} />
        </>
      );
    }
  };

  return (
    <ScrollView
      contentContainerStyle={tw`flex md:flex-row flex-1 items-start w-full max-w-screen-xl mx-auto p-4`}
    >
      <Content entry={data.entry} />
    </ScrollView>
  );
}
