import { Text, View } from "app/design-system";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { tw } from "app/design-system/tailwind";

export default function BeatmakersEmptyState() {
  return (
    <View className="flex-1 py-16">
      <Icon
        style={tw`mx-auto`}
        color={tw.color("white")}
        name="magnify"
        size={80}
      />
      <Text className="mx-auto text-lg">Search for beatmakers</Text>
    </View>
  );
}
