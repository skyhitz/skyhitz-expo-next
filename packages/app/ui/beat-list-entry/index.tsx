import { Image, Text, View } from "app/design-system";
import { Entry } from "app/api/graphql";
import { Pressable } from "react-native";
import { imageUrlSmall } from "app/utils/entry";
import { Price } from "app/ui/beat-list-entry/price";
import { FavoriteButton } from "app/ui/buttons/favoriteButton";
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
    <Pressable onPress={onPress}>
      <View className="w-full flex items-center flex-row py-2">
        <Image
          style={{ width: 40, height: 40 }}
          source={{
            uri: entry.imageUrl ? imageUrlSmall(entry.imageUrl) : "",
          }}
        />
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
          <Price className="mr-3" />
          <FavoriteButton size={20} />
          <ShowMore entry={entry} />
        </View>
      </View>
    </Pressable>
  );
}
