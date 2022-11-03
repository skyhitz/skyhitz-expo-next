import { FlatList } from "react-native";
import { Text } from "app/design-system";
import { BeatListEntry } from "app/ui/beat-list-entry";
import { usePlayback } from "app/hooks/usePlayback";
import { useRecentlyAdded } from "app/hooks/algolia/useRecentlyAdded";

export default function RecentlyAddedList() {
  const { data, onNextPage } = useRecentlyAdded();
  const { playEntry } = usePlayback();

  return (
    <FlatList
      ListHeaderComponent={ListHeader}
      data={data}
      keyExtractor={(item) => item.id!}
      renderItem={({ item }) => (
        <BeatListEntry entry={item} onPress={() => playEntry(item, data)} />
      )}
      showsVerticalScrollIndicator={false}
      onEndReached={onNextPage}
      onEndReachedThreshold={0.1}
    />
  );
}

function ListHeader() {
  return <Text className="pb-4">Recently Added</Text>;
}
