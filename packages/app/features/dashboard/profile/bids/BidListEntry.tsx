import { Button, Image, Text, View } from "app/design-system";
import { Pressable } from "react-native";
import { useRouter } from "solito/router";
import { imageSrc, imageUrlSmall } from "app/utils/entry";
import { usePlayback } from "app/hooks/usePlayback";
import { EnrichedEntry } from "app/types";

export function BidListEntry({ entry }: { entry: EnrichedEntry }) {
  const { push } = useRouter();
  const { playEntry } = usePlayback();

  return (
    <Pressable onPress={() => playEntry(entry, [entry])}>
      <View className="w-full flex items-center flex-row py-2">
        <Image
          className="w-10 h-10"
          uri={imageUrlSmall(entry.imageUrl)}
          fallbackUri={imageSrc(entry.imageUrl)}
        />

        <View className="ml-2 flex justify-center pr-2">
          <Text numberOfLines={1} className="text-sm font-bold leading-6">
            {entry.title}
          </Text>
          <Text
            numberOfLines={1}
            className="text-xs text-neutral-400 leading-6"
          >
            {entry.artist}
          </Text>
        </View>
        <Text className="text-sm text-grey flex-1">
          {parseFloat(entry.offer.amount).toFixed(0)} XLM for{" "}
          {(
            parseFloat(entry.offer.price) *
            parseFloat(entry.offer.amount) *
            100
          ).toFixed()}
          % of the asset
        </Text>
        <View className="flex flex-row items-center">
          <Button
            text="Cancel"
            onPress={() => {}}
            variant="primary"
            className="mx-2"
          />
          <Button
            text="Details"
            onPress={() => push(`/dashboard/beat/${entry.id}`)}
          />
        </View>
      </View>
    </Pressable>
  );
}
