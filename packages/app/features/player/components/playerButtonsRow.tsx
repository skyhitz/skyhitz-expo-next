import { View } from "app/design-system";
import ShuffleIcon from "app/ui/icons/shuffle";
import PrevIcon from "app/ui/icons/skip-backward";
import NextIcon from "app/ui/icons/skip-forward";
import PlayIcon from "app/ui/icons/play";
import PauseIcon from "app/ui/icons/pause";
import LoopIcon from "app/ui/icons/repeat";
import { Pressable } from "app/design-system/pressable";
import { tw } from "app/design-system/tailwind";
import { useRecoilState, useRecoilValue } from "recoil";
import { usePlayback } from "app/hooks/usePlayback";
import { isPlayingAtom, loopAtom, shuffleAtom } from "app/state/playback";

const style = {
  default: "h-10 max-w-60",
  large: "h-20",
};

type Props = {
  size?: "default" | "large";
};

export function PlayerButtonsRow({ size = "default" }: Props) {
  const [shuffleActive, setShuffleActive] = useRecoilState(shuffleAtom);
  const [loopActive, setLoopActive] = useRecoilState(loopAtom);
  const isPlaying = useRecoilValue(isPlayingAtom);
  const { playPause, skipForward, skipBackward } = usePlayback();
  const sizeModificator = size === "large" ? 6 : 0;

  return (
    <View
      className={`flex flex-row w-full justify-evenly items-center ${style[size]}`}
    >
      <Pressable onPress={() => setShuffleActive(!shuffleActive)}>
        <ShuffleIcon
          color={shuffleActive ? tw.color("blue-light") : tw.color("white")}
          size={14 + sizeModificator}
        />
      </Pressable>
      <Pressable onPress={skipBackward}>
        <PrevIcon color={tw.color("white")} size={18 + sizeModificator} />
      </Pressable>
      <Pressable onPress={playPause}>
        {isPlaying ? (
          <PauseIcon color={tw.color("white")} size={22 + sizeModificator} />
        ) : (
          <PlayIcon color={tw.color("white")} size={22 + sizeModificator} />
        )}
      </Pressable>
      <Pressable onPress={skipForward}>
        <NextIcon color={tw.color("white")} size={18 + sizeModificator} />
      </Pressable>
      <Pressable onPress={() => setLoopActive(!loopActive)}>
        <LoopIcon
          color={loopActive ? tw.color("blue-light") : tw.color("white")}
          size={14 + sizeModificator}
        />
      </Pressable>
    </View>
  );
}
