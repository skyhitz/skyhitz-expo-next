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

export function PlayerButtonsRow() {
  const [shuffleActive, setShuffleActive] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [randomActive, setRandomActive] = useState<boolean>(false);

  return (
    <View className="flex flex-row w-full h-10 justify-evenly items-center max-w-60">
      <Pressable onPress={() => setShuffleActive(!shuffleActive)}>
        <ShuffleIcon
          color={shuffleActive ? tw.color("lightBrandBlue") : tw.color("white")}
          size={14}
        />
      </Pressable>
      <Pressable onPress={() => console.log("prev")}>
        <PrevIcon color={tw.color("white")} size={18} />
      </Pressable>
      <Pressable onPress={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? (
          <PauseIcon color={tw.color("white")} size={22} />
        ) : (
          <PlayIcon color={tw.color("white")} size={22} />
        )}
      </Pressable>
      <Pressable onPress={() => console.log("next")}>
        <NextIcon color={tw.color("white")} size={18} />
      </Pressable>
      <Pressable onPress={() => setRandomActive(!randomActive)}>
        <LoopIcon
          color={randomActive ? tw.color("lightBrandBlue") : tw.color("white")}
          size={14}
        />
      </Pressable>
    </View>
  );
}
