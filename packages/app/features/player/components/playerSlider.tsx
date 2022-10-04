import React from "react";
import Slider from "@react-native-community/slider";
import { tw } from "app/design-system/tailwind";
import { Text, View } from "app/design-system";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  currentDurationAtom,
  currentPositionAtom,
  playbackStateAtom,
} from "app/state/playback";
import { usePlayback } from "app/hooks/usePlayback";
import { any, equals } from "ramda";

export function PlayerSlider() {
  const duration = useRecoilValue(currentDurationAtom);
  const playbackState = useRecoilValue(playbackStateAtom);
  const [position, setPosition] = useRecoilState(currentPositionAtom);
  const { startSeeking, onSeekCompleted } = usePlayback();
  const songTime = duration / 1000;
  const currentTime = position / 1000;
  const value = duration !== 0 ? position / duration : 0;

  return (
    <View className="flex flex-row items-center justify-between w-full">
      <Text className="text-white text-xs mr-3 w-10 text-right">
        {Math.floor(currentTime / 60)}:
        {Math.floor(currentTime % 60)
          .toString()
          .padStart(2, "0")}
      </Text>

      <View
        className="flex-1"
        pointerEvents={
          any(equals(playbackState), ["LOADING", "IDLE", "ERROR"])
            ? "none"
            : "auto"
        }
      >
        <Slider
          style={{ flex: 1 }}
          minimumValue={0}
          maximumValue={1}
          value={value}
          onSlidingStart={(_) => {
            startSeeking();
          }}
          onValueChange={(value: number) => {
            if (playbackState === "SEEKING") {
              setPosition(value * duration);
            }
          }}
          onSlidingComplete={(value: number) => {
            onSeekCompleted(value * duration);
          }}
          minimumTrackTintColor={tw.color("blue")}
          maximumTrackTintColor={tw.color("blue-track")}
          thumbTintColor={tw.color("white")}
        />
      </View>

      <Text className="text-white text-xs ml-3 w-10">
        {Math.floor(songTime / 60)}:
        {Math.floor(songTime % 60)
          .toString()
          .padStart(2, "0")}
      </Text>
    </View>
  );
}
