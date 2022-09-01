import { SafeAreaView } from "app/design-system/safe-area-view";
import { Entry, TopChartQuery, useTopChartQuery } from "app/api/graphql";
import { FlatList } from "react-native";
import { BeatListEntry } from "app/ui/beat-list-entry";
import { Text } from "app/design-system";
import { usePagination } from "../../../hooks/usePagination";
import { useCallback } from "react";

export function ChartScreen() {
  const getId = useCallback((entry: Entry) => entry.id!, []);
  const transformResponse = useCallback(
    (result: TopChartQuery) => result.topChart,
    []
  );
  const { data, onNextPage } = usePagination({
    queryHook: useTopChartQuery,
    getId,
    transformResponse,
  });

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
        onEndReached={onNextPage}
      />
    </SafeAreaView>
  );
}

function ListHeader() {
  return <Text className="text-2xl mb-4">Top Beats</Text>;
}
