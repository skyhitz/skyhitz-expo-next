import { SafeAreaView } from "app/design-system/safe-area-view";
import { useEffect, useState } from "react";
import { Entry, useTopChartQuery } from "app/api/graphql";
import { isSome } from "app/utils";
import { FlatList } from "react-native";
import { BeatListEntry } from "app/ui/beat-list-entry";
import { Text } from "app/design-system";

export function ChartScreen() {
  const [nextPage, setNextPage] = useState(0);
  const [data, setData] = useState<Entry[]>([]);
  const { data: queryData, refetch } = useTopChartQuery({
    variables: { page: 0 },
  });

  useEffect(() => {
    if (queryData && queryData.topChart) {
      setData((prev) => prev.concat(queryData.topChart!.filter(isSome)));
      setNextPage((prev) => prev + 1);
    }
  }, [queryData, setData, setNextPage]);

  return (
    <SafeAreaView
      edges={["top"]}
      className="w-full max-w-6xl mx-auto flex-1 flex p-4 pb-0 bg-blue-dark"
    >
      <FlatList
        ListHeaderComponent={ListHeader}
        data={data}
        keyExtractor={(item) => item.id!}
        renderItem={({ item, index }) => (
          <BeatListEntry entry={item} spot={index + 1} />
        )}
        onEndReached={() => refetch({ page: nextPage })}
      />
    </SafeAreaView>
  );
}

function ListHeader() {
  return <Text className="text-2xl mb-4">Top Beats</Text>;
}
