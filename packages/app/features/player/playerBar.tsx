import { Text, View } from "app/design-system";
import { PlayerSlider } from "./components/playerSlider";

export function PlayerBar() {
  return (
    <View className="flex flex-row justify-between items-center h-20 bg-blue-transparent">
      <View className="p-4 w-52 flex flex-row items-center">
        <View className="bg-red h-10 w-10" />
        <View className="pl-4 h-full flex-column justify-end">
          <Text
            className="text-sm text-left font-bold color-white"
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            Song title
          </Text>
          <Text
            className="text-xs text-left color-grey mt-1"
            ellipsizeMode="tail"
            numberOfLines={1}
          >
            Artist
          </Text>
        </View>
      </View>
      {/* <View style={styles.controlsWrap}>
      <View style={styles.rowControls}>
        <ShuffleBtn size={14} />
        <PrevBtn size={18} />
        <PlayBtn size={22} />
        <ForwardBtn size={18} />
        <LoopBtn size={14} />
      </View>
      <View style={styles.sliderControls}>
        <CurrentTimeDisplay />
        <Slider />
        <DurationDisplay />
      </View>
    </View>
    <View style={styles.videoWrap} /> */}
    </View>
  );
}
