import { Text, View } from "app/design-system";
import { PlayerSlider } from "./components/playerSlider";
import { PlayerButtonsRow } from "./components/playerButtonsRow";
import { VideoPlayer } from "app/ui/VideoPlayer";
import { usePlayback } from "app/hooks/usePlayback";

export function PlayerBar() {
  const { entry, playbackState } = usePlayback();

  return (
    <View
      className={`flex flex-row justify-between items-center h-20 bg-blue-field bg-opacity-97 ${
        playbackState === "IDLE" || playbackState === "ERROR" ? "hidden" : ""
      }`}
    >
      <View className="p-4 w-52 flex flex-row items-center">
        <VideoPlayer fixedSize={40} />
        <View className="pl-4 h-full justify-end">
          <Text
            className="text-sm text-left font-bold text-white"
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {entry?.title}
          </Text>
          <Text
            className="text-xs text-left text-grey mt-1"
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            {entry?.artist}
          </Text>
        </View>
      </View>
      {playbackState === "ERROR" ? (
        <View className="h-20 items-center justify-center">
          <Text className="text-red">Something went wrong. Try again.</Text>
        </View>
      ) : (
        <View className="items-center justify-evenly w-100">
          <PlayerButtonsRow />
          <PlayerSlider />
        </View>
      )}

      <View className="w-50" />
    </View>
  );
}
