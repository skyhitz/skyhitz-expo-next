import { ActivityIndicator, Text, View } from "app/design-system";
import { tw } from "app/design-system/tailwind";

export default function SearchingIndicator({
  visible,
  searchPhrase,
}: {
  visible: boolean;
  searchPhrase: string;
}) {
  if (!visible) return null;

  return (
    <View className="flex flex-row items-center">
      <ActivityIndicator color={tw.color("white")} />
      <Text className="text-xs ml-2">
        Searching for &quot;{searchPhrase}&quot;
      </Text>
    </View>
  );
}
