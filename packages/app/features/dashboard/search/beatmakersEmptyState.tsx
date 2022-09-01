import { Text, View } from "app/design-system";
import Search from "app/ui/icons/search";

export default function BeatmakersEmptyState() {
  return (
    <View className="flex-1 py-8 flex-row justify-center mx-auto">
      <Search color="white" size={24} />
      <Text className="ml-1 text-lg">Search for beatmakers</Text>
    </View>
  );
}
