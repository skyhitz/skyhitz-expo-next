import { View } from "app/design-system";
import ShuffleIcon from "app/ui/icons/shuffle";
import PrevIcon from "app/ui/icons/skip-backward";
import NextIcon from "app/ui/icons/skip-forward";
import PlayIcon from "app/ui/icons/play";
import PauseIcon from "app/ui/icons/pause";
import LoopIcon from "app/ui/icons/repeat";
import { Pressable } from "app/design-system/pressable";
import { tw } from "app/design-system/tailwind";
import { usePlayback } from "app/hooks/usePlayback";
import { ActivityIndicator } from "app/design-system/activityIndicator";

const style = {
  default: "h-10 max-w-60",
  large: "h-20",
};

type Props = {
  size?: "default" | "large";
};

export function PlayerButtonsRow({ size = "default" }: Props) {
  const {
    playPause,
    skipForward,
    skipBackward,
    toggleLoop,
    shuffle,
    playbackState,
    isPlaying,
    looping,
    toggleShuffle,
  } = usePlayback();
  const sizeModificator = size === "large" ? 6 : 0;

  console.log(playbackState);

  return (
    <View
      className={`flex flex-row w-full justify-evenly items-center ${style[size]}`}
    >
      <Pressable onPress={toggleShuffle}>
        <ShuffleIcon
          color={shuffle ? tw.color("blue-light") : tw.color("white")}
          size={14 + sizeModificator}
        />
      </Pressable>
      <Pressable onPress={skipBackward}>
        <PrevIcon color={tw.color("white")} size={18 + sizeModificator} />
      </Pressable>
      {playbackState === "LOADING" || playbackState === "FALLBACK" ? (
        <ActivityIndicator />
      ) : (
        <Pressable onPress={playPause}>
          {isPlaying ? (
            <PauseIcon color={tw.color("white")} size={22 + sizeModificator} />
          ) : (
            <PlayIcon color={tw.color("white")} size={22 + sizeModificator} />
          )}
        </Pressable>
      )}
      <Pressable onPress={skipForward}>
        <NextIcon color={tw.color("white")} size={18 + sizeModificator} />
      </Pressable>
      <Pressable onPress={toggleLoop}>
        <LoopIcon
          color={looping ? tw.color("blue-light") : tw.color("white")}
          size={14 + sizeModificator}
        />
      </Pressable>
    </View>
  );
}
