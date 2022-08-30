import { Modal, Text, View } from "app/design-system";
import { Entry } from "app/api/graphql";
import { Image } from "react-native";
import { imageUrlMedium, imageUrlSmall } from "app/utils/entry";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { Price } from "app/ui/beat-list-entry/price";
import { FavoriteButton } from "app/ui/favoriteButton";
import { tw } from "app/design-system/tailwind";
import { useState } from "react";
import { SafeAreaView } from "app/design-system/safe-area-view";

function ShowMore({ entry }: { entry: Entry }) {
  const [showing, setShowing] = useState(false);
  return (
    <>
      <Icon.Button
        name="dots-vertical"
        size={30}
        color={tw.color("white")}
        backgroundColor={tw.color("transparent")}
        iconStyle={tw`m-0`}
        style={tw`p-0`}
        onPress={() => setShowing(!showing)}
      />
      <Modal transparent={true} visible={showing}>
        <SafeAreaView className="bg-blue-field/90 flex-1 items-center justify-around">
          <View className="flex items-center">
            <Image
              source={{
                uri: entry.imageUrl ? imageUrlMedium(entry.imageUrl) : "",
                width: 225,
                height: 225,
              }}
            />
            <Text>{entry.title}</Text>
            <Text>{entry.artist}</Text>
          </View>
          <View></View>
        </SafeAreaView>
      </Modal>
    </>
  );
}

export function BeatListEntry({
  entry,
  spot,
}: {
  entry: Entry;
  spot?: number;
}) {
  return (
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
        <Text numberOfLines={1} className="text-xs text-neutral-400 leading-6">
          {entry.artist}
        </Text>
      </View>
      <View className="flex flex-row items-center">
        <Price className="mr-3" />
        <FavoriteButton size={20} />
        <ShowMore entry={entry} />
      </View>
    </View>
  );
}
