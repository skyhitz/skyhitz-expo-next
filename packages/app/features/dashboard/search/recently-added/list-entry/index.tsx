import { Text, View } from "app/design-system";
import { Entry } from "app/api/graphql";
import { Image } from "react-native";
import { imageUrlSmall } from "app/utils/entry";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Price } from "app/features/dashboard/search/recently-added/list-entry/price";
import { FavoriteButton } from "app/features/dashboard/search/recently-added/list-entry/favoriteButton";
import { tw } from "app/design-system/tailwind";

export function BeatListEntry({ entry }: { entry: Entry }) {
  return (
    <View className="w-full flex flex-row py-2">
      <Image
        style={{ width: 40, height: 40 }}
        source={{
          uri: entry.imageUrl ? imageUrlSmall(entry.imageUrl) : "",
        }}
      />
      <View className="ml-2 flex justify-center">
        <Text className="text-sm font-bold leading-6">{entry.title}</Text>
        <Text className="text-xs text-neutral-400 leading-6">
          {entry.artist}
        </Text>
      </View>
      <View className="ml-auto flex flex-row items-center">
        <Price className="mr-3" />
        <FavoriteButton size={20} />
        <Icon name="dots-vertical" size={30} color={tw.color("white")} />
      </View>
    </View>
  );
}
