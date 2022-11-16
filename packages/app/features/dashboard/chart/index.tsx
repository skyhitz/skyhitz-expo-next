import { SafeAreaView } from "app/design-system/safe-area-view";
import { FlatList } from "react-native";
import { BeatListEntry } from "app/ui/beat-list-entry";
import { Text } from "app/design-system";
import { useTopChart } from "app/hooks/algolia/useTopChart";
import { BeatSkeleton } from "app/ui/skeletons/BeatSkeleton";

export function ChartScreen() {
  const { data, onNextPage, loading } = useTopChart();

  const Content = () => {
    if (loading) {
      return <BeatSkeleton />;
    }

    return (
      <FlatList
        data={data}
        keyExtractor={(item) => item.id!}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <BeatListEntry entry={item} spot={index + 1} playlist={data} />
        )}
        onEndReached={onNextPage}
      />
    );
  };

  return (
    <SafeAreaView
      edges={["top"]}
      className="w-full max-w-6xl mx-auto flex-1 flex px-4 bg-blue-dark pt-4"
    >
      <Text className="text-2xl mb-4">Top Beats</Text>
      <Content />
    </SafeAreaView>
  );
}
