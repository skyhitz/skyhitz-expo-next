import { Text, View } from "app/design-system";
import Search from "app/ui/icons/search";

export default function BeatmakersEmptyState() {
  return (
    <View className="flex-1 py-8 flex-row justify-center mx-auto">
      <Search color="white" size={22} />
      <Text className="ml-3 text-lg">Search for Beatmakers</Text>
    </View>
  );
}
