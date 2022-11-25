import { FlatList } from "react-native";
import { Text } from "app/design-system";
import { BeatListEntry } from "app/ui/beat-list-entry";
import { useRecentlyAdded } from "app/hooks/algolia/useRecentlyAdded";
import { BeatSkeleton } from "app/ui/skeletons/BeatSkeleton";

export default function RecentlyAddedList() {
  const { data, onNextPage, loading } = useRecentlyAdded();

  if (loading) {
    return <BeatSkeleton />;
  }

  return (
    <FlatList
      ListHeaderComponent={ListHeader}
      data={data}
      keyExtractor={(item) => item.id!}
      renderItem={({ item }) => <BeatListEntry entry={item} playlist={data} />}
      showsVerticalScrollIndicator={false}
      onEndReached={onNextPage}
      onEndReachedThreshold={0.1}
    />
  );
}

function ListHeader() {
  return <Text className="pb-4 mt-0.5">Recently Added</Text>;
}
