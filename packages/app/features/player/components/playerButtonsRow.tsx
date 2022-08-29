import { View } from "app/design-system";
import { useState } from "react";
import ShuffleIcon from "app/ui/icons/shuffle";
import PrevIcon from "app/ui/icons/skip-backward";
import NextIcon from "app/ui/icons/skip-forward";
import PlayIcon from "app/ui/icons/play";
import PauseIcon from "app/ui/icons/pause";
import LoopIcon from "app/ui/icons/repeat";
import { Pressable } from "app/design-system/pressable";
import { tw } from "app/design-system/tailwind";

type Props = {
  size?: "default" | "large";
};

export function PlayerButtonsRow({ size = "default" }: Props) {
  const [shuffleActive, setShuffleActive] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [randomActive, setRandomActive] = useState<boolean>(false);
  const classes = size === "default" ? " h-10 max-w-60" : " h-20";
  const sizeModificator = size === "large" ? 6 : 0;

  return (
    <View
      className={"flex flex-row w-full justify-evenly items-center" + classes}
    >
      <Pressable onPress={() => setShuffleActive(!shuffleActive)}>
        <ShuffleIcon
          color={shuffleActive ? tw.color("blue-light") : tw.color("white")}
          size={14 + sizeModificator}
        />
      </Pressable>
      <Pressable
        onPress={() => {
          //TODO
        }}
      >
        <PrevIcon color={tw.color("white")} size={18 + sizeModificator} />
      </Pressable>
      <Pressable onPress={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? (
          <PauseIcon color={tw.color("white")} size={22 + sizeModificator} />
        ) : (
          <PlayIcon color={tw.color("white")} size={22 + sizeModificator} />
        )}
      </Pressable>
      <Pressable
        onPress={() => {
          //TODO
        }}
      >
        <NextIcon color={tw.color("white")} size={18 + sizeModificator} />
      </Pressable>
      <Pressable onPress={() => setRandomActive(!randomActive)}>
        <LoopIcon
          color={randomActive ? tw.color("blue-light") : tw.color("white")}
          size={14 + sizeModificator}
        />
      </Pressable>
    </View>
  );
}
