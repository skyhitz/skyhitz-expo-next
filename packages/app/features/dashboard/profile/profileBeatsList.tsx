import { ActivityIndicator, Text, View } from "app/design-system";
import { FlatList } from "react-native";
import { BeatListEntry } from "app/ui/beat-list-entry";
import { usePlayback } from "app/hooks/usePlayback";
import { Entry } from "app/api/graphql";

type Props = {
  beats: Entry[];
  loading: boolean;
  emptyStateText: string;
};

export default function ProfileBeatsList({
  beats,
  loading,
  emptyStateText,
}: Props) {
  const { playEntry } = usePlayback();

  return (
    <View className="flex-1 bg-blue-dark px-5 w-full max-w-6xl mx-auto">
      <FlatList
        keyExtractor={(item) => item.id!}
        data={beats}
        renderItem={({ item }) => (
          <BeatListEntry entry={item} onPress={() => playEntry(item, beats)} />
        )}
        ListEmptyComponent={
          <ListEmptyComponent
            loading={loading}
            emptyStateText={emptyStateText}
          />
        }
      />
    </View>
  );
}

function ListEmptyComponent({
  loading,
  emptyStateText,
}: {
  loading: boolean;
  emptyStateText: string;
}) {
  return (
    <View className="flex-1 flex items-center justify-center mt-8">
      {loading ? <ActivityIndicator /> : <Text>{emptyStateText}</Text>}
    </View>
  );
}
