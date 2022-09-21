import { Image, Text, TextLink, View } from "app/design-system";
import { Entry } from "app/api/graphql";
import { Pressable } from "react-native";
import { imageUrlSmall } from "app/utils/entry";
import Price from "app/ui/price";
import { LikeButton } from "app/ui/buttons/likeButton";
import { ShowMore } from "app/ui/beat-list-entry/show-more";

export function BeatListEntry({
  entry,
  spot,
  onPress,
}: {
  entry: Entry;
  spot?: number;
  onPress: () => void;
}) {
  return (
    <TextLink href={`/dashboard/search/beat/${entry.id}`}>
      <View className="w-full flex items-center flex-row py-2">
        <Pressable onPress={onPress}>
          <Image
            style={{ width: 40, height: 40 }}
            source={{
              uri: entry.imageUrl ? imageUrlSmall(entry.imageUrl) : "",
            }}
          />
        </Pressable>
        {spot && (
          <Text className="text-2xl leading-none text-center ml-2 w-11">
            {spot}
          </Text>
        )}
        <View className="ml-2 flex justify-center flex-1 pr-2">
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
        <View className="flex flex-row items-center">
          <Price code={entry.code} issuer={entry.issuer} className="mr-3" />
          <LikeButton size={20} entry={entry} />
          <ShowMore entry={entry} />
        </View>
      </View>
    </TextLink>
  );
}
