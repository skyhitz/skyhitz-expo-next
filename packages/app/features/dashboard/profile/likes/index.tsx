import { Pressable, Text, View } from "app/design-system";
import { useRouter } from "solito/router";
import { FlatList } from "react-native";
import { useUserLikesQuery } from "app/api/graphql";
import { BeatListEntry } from "app/ui/beat-list-entry";
import { isSome } from "app/utils";
import { usePlayback } from "app/hooks/usePlayback";
import ChevronLeft from "app/ui/icons/chevron-left";
import { tw } from "app/design-system/tailwind";

export default function LikesScreen() {
  const { back } = useRouter();
  const { data } = useUserLikesQuery();
  const entries = data?.userLikes?.filter(isSome) ?? [];
  const { playEntry } = usePlayback();

  return (
    <View className="flex-1 w-full">
      <Pressable
        className="flex flex-row mb-8 sm:mt-8 items-center"
        onPress={back}
      >
        <ChevronLeft color={tw.color("white")} size={24} />
        <Text className="text-lg ml-8 font-bold">Likes</Text>
      </Pressable>
      <View className="flex-1 bg-blue-dark px-5 w-full max-w-6xl mx-auto">
        <FlatList
          data={entries}
          renderItem={({ item }) => (
            <BeatListEntry
              entry={item}
              onPress={() => playEntry(item, entries)}
            />
          )}
        />
      </View>
    </View>
  );
}
