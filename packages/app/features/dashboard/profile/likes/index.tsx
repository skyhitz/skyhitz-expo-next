import { Text, View } from "app/design-system";
import { useUserLikesQuery } from "app/api/graphql";
import { isSome } from "app/utils";
import { usePlayback } from "app/hooks/usePlayback";
import { FlatList } from "react-native";
import { BeatListEntry } from "app/ui/beat-list-entry";

export default function LikesScreen() {
  const { data } = useUserLikesQuery();
  const entries = data?.userLikes?.filter(isSome) ?? [];
  const { playEntry } = usePlayback();

  return (
    <View className="flex-1 w-full">
      <Text className="text-lg ml-8 font-bold hidden web:flex">Likes</Text>
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
