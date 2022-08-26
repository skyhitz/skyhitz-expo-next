import { Text, View } from "app/design-system";
import { PlayerSlider } from "./components/playerSlider";
import { PlayerButtonsRow } from "./components/playerButtonsRow";

export function PlayerBar() {
  return (
    <View className="flex flex-row justify-between items-center h-20 bg-blue-transparent">
      <View className="p-4 w-52 flex flex-row items-center">
        <View className="bg-red h-10 w-10" />
        <View className="pl-4 h-full flex-column justify-end">
          <Text
            className="text-sm text-left font-bold text-white"
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            Song title
          </Text>
          <Text
            className="text-xs text-left text-grey mt-1"
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            Artist
          </Text>
        </View>
      </View>
      <View className="items-center justify-evenly flex-column w-100">
        <PlayerButtonsRow />
        <PlayerSlider />
      </View>
      <View className="w-50" />
    </View>
  );
}
