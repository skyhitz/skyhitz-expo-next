import { FlatList } from "react-native";
import { Text } from "app/design-system";
import { useEffect, useState } from "react";
import { Entry, useRecentlyAddedQuery } from "app/api/graphql";
import { BeatListEntry } from "app/ui/beat-list-entry";
import { isSome } from "app/utils";

export default function RecentlyAddedList() {
  const [nextPage, setNextPage] = useState(0);
  const [data, setData] = useState<Entry[]>([]);
  const { data: queryData, refetch } = useRecentlyAddedQuery({
    variables: { page: 0 },
  });

  useEffect(() => {
    if (queryData && queryData.recentlyAdded) {
      setData((prev) => prev.concat(queryData.recentlyAdded!.filter(isSome)));
      setNextPage((prev) => prev + 1);
    }
  }, [queryData, setData, setNextPage]);

  return (
    <FlatList
      ListHeaderComponent={ListHeader}
      data={data}
      keyExtractor={(item) => item.id!}
      renderItem={({ item }) => <BeatListEntry entry={item} />}
      onEndReached={() => refetch({ page: nextPage })}
      showsVerticalScrollIndicator={false}
    />
  );
}

function ListHeader() {
  return <Text className="pb-4">Recently Added</Text>;
}
