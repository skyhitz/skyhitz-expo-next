import { Text, View } from "app/design-system";
import { FlatList } from "react-native";
import { BeatListEntry } from "app/ui/beat-list-entry";
import { usePlayback } from "app/hooks/usePlayback";
import { Entry } from "app/api/graphql";

type Props = {
  beats: Entry[];
};

export default function ProfileBeatsList({ beats }: Props) {
  const { playEntry } = usePlayback();

  return (
    <View className="flex-1 bg-blue-dark px-5 w-full max-w-6xl mx-auto">
      <FlatList
        data={beats}
        renderItem={({ item }) => (
          <BeatListEntry entry={item} onPress={() => playEntry(item, beats)} />
        )}
        ListEmptyComponent={
          <Text className="w-full text-center mt-8">No beats here</Text>
        }
      />
    </View>
  );
}
