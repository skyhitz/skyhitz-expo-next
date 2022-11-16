import { SafeAreaView } from "app/design-system/safe-area-view";
import { FlatList } from "react-native";
import { BeatListEntry } from "app/ui/beat-list-entry";
import { Text } from "app/design-system";
import { useTopChart } from "app/hooks/algolia/useTopChart";

export function ChartScreen() {
  const { data, onNextPage } = useTopChart();

  return (
    <SafeAreaView
      edges={["top"]}
      className="w-full max-w-6xl mx-auto flex-1 flex px-4 bg-blue-dark pt-4"
    >
      <Text className="text-2xl mb-4">Top Beats</Text>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id!}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <BeatListEntry entry={item} spot={index + 1} playlist={data} />
        )}
        onEndReached={onNextPage}
      />
    </SafeAreaView>
  );
}
