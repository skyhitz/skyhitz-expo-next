import { FlatList } from "react-native";
import { Text } from "app/design-system";
import {
  Entry,
  RecentlyAddedQuery,
  useRecentlyAddedQuery,
} from "app/api/graphql";
import { BeatListEntry } from "app/ui/beat-list-entry";
import { usePagination } from "app/hooks/usePagination";
import { useCallback } from "react";

export default function RecentlyAddedList() {
  const getId = useCallback((entry: Entry) => entry.id!, []);
  const transformResponse = useCallback(
    (result: RecentlyAddedQuery) => result.recentlyAdded,
    []
  );
  const { data, onNextPage } = usePagination({
    queryHook: useRecentlyAddedQuery,
    transformResponse,
    getId,
  });

  return (
    <FlatList
      ListHeaderComponent={ListHeader}
      data={data}
      keyExtractor={(item) => item.id!}
      renderItem={({ item }) => <BeatListEntry entry={item} />}
      onEndReached={onNextPage}
      onEndReachedThreshold={0.1}
    />
  );
}

function ListHeader() {
  return <Text className="pb-4">Recently Added</Text>;
}
