import { FlatList } from "react-native";
import { Text } from "app/design-system";
import { useEffect, useState } from "react";
import { Entry, useRecentlyAddedQuery } from "app/api/graphql";
import { BeatListEntry } from "app/features/dashboard/search/recently-added/list-entry";

export default function RecentlyAddedList() {
  const [nextPage, setNextPage] = useState(0);
  const [data, setData] = useState<Entry[]>([]);
  const { data: queryData, refetch } = useRecentlyAddedQuery({
    variables: { page: 0 },
  });

  useEffect(() => {
    if (queryData && queryData.recentlyAdded) {
      const recentlyAdded: Entry[] = queryData.recentlyAdded.filter(
        (entry): entry is Entry => entry !== null
      );
      setData((d) => d.concat(recentlyAdded));
      setNextPage((p) => p + 1);
    }
  }, [queryData, setData, setNextPage]);

  return (
    <FlatList
      ListHeaderComponent={ListHeader}
      data={data}
      keyExtractor={(item, index) => item.id ?? index.toString()}
      renderItem={({ item }) => <BeatListEntry entry={item} />}
      onEndReached={() => refetch({ page: nextPage })}
    />
  );
}

function ListHeader() {
  return <Text className="pb-4">Recently Added</Text>;
}
