import { Image, Text, View } from "app/design-system";
import { Entry } from "app/api/graphql";
import { Pressable } from "react-native";
import Price from "app/ui/price";
import LikeButton from "app/ui/buttons/likeButton";
import VerticalDots from "app/ui/icons/verticalDots";
import { ReactElement } from "react";
import { useRouter } from "solito/router";
import { tw } from "app/design-system/tailwind";
import { imageSrc, imageUrlSmall } from "app/utils/entry";
import { usePlayback } from "app/hooks/usePlayback";

export type PressableState = Readonly<{
  hovered?: boolean;
}>;

export function BeatListEntry({
  entry,
  spot,
  playlist,
}: {
  entry: Entry;
  spot?: number;
  playlist: Entry[];
}) {
  const { push } = useRouter();
  const { playEntry } = usePlayback();

  return (
    <Pressable onPress={() => playEntry(entry, playlist)}>
      {({ hovered }: PressableState): ReactElement => {
        return (
          <View className="w-full flex items-center flex-row py-2">
            <Image
              className="w-10 h-10"
              uri={imageUrlSmall(entry.imageUrl)}
              fallbackUri={imageSrc(entry.imageUrl)}
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
              <Price
                entry={entry}
                className="mr-3 hover:hidden"
                hovered={hovered}
              />
              <LikeButton size={20} entry={entry} />
              <Pressable
                onPress={() => {
                  push(`/dashboard/beat/${entry.id}`);
                }}
              >
                <VerticalDots size={30} color={tw.color("white")} />
              </Pressable>
            </View>
          </View>
        );
      }}
    </Pressable>
  );
}
