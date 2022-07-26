import { Text, View } from "app/design-system";
import { Pressable, ViewStyle } from "react-native";
import ChevronUp from "app/ui/icons/chevron-up";
import { tw } from "app/design-system/tailwind";
import PlayIcon from "app/ui/icons/play";
import PauseIcon from "app/ui/icons/pause";
import Animated from "react-native-reanimated";

import { usePlayback } from "app/hooks/usePlayback";
import { ActivityIndicator } from "app/design-system/activityIndicator";

type Props = {
  onTogglePress?: () => void;
  animatedStyle: ViewStyle;
};

export function MiniPlayerBar({ onTogglePress, animatedStyle }: Props) {
  const { playPause, playbackState, entry } = usePlayback();

  return (
    <Animated.View
      style={[
        tw.style(
          `flex flex-row justify-between items-center h-10 bg-blue-transparent px-2.5 ${
            playbackState === "IDLE" || playbackState === "ERROR"
              ? "hidden"
              : ""
          }`
        ),
        animatedStyle,
      ]}
    >
      <Pressable onPress={onTogglePress}>
        <View className="flex flex-row items-center">
          <ChevronUp color={tw.color("white")} />
          <Text className="text-sm pl-1 text-white ml-2.5">
            {entry?.title} - {entry?.artist}
          </Text>
        </View>
      </Pressable>
      {playbackState === "LOADING" || playbackState === "FALLBACK" ? (
        <ActivityIndicator />
      ) : (
        <Pressable onPress={playPause}>
          {playbackState === "PLAYING" ? (
            <PauseIcon color={tw.color("white")} size={22} />
          ) : (
            <PlayIcon color={tw.color("white")} size={22} />
          )}
        </Pressable>
      )}
    </Animated.View>
  );
}
