import React, { useEffect, useState } from "react";
import Slider from "@react-native-community/slider";
import { tw } from "app/design-system/tailwind";
import { Text, View } from "app/design-system";
import { usePlayback } from "app/hooks/usePlayback";
import { any, equals } from "ramda";
import { SkyhitzSlider } from "app/ui/slider/SkyhitzSlider";
import { useSharedValue, runOnUI } from "react-native-reanimated";
export function PlayerSlider() {
  const { startSeeking, onSeekCompleted, duration, position, playbackState } =
    usePlayback();
  const [seekPosition, setSeekPosition] = useState<number>(position);
  const songTime = duration / 1000;
  const currentTime =
    playbackState === "SEEKING" ? seekPosition / 1000 : position / 1000;
  const value = useSharedValue(duration !== 0 ? position / duration : 0);

  const worklet = (num: number) => {
    "worklet";
    value.value = num;
  };

  useEffect(() => {
    const num = duration !== 0 ? position / duration : 0;
    runOnUI(worklet)(num);
  }, [position, duration]);

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
          any(equals(playbackState), ["LOADING", "IDLE", "ERROR", "FALLBACK"])
            ? "none"
            : "auto"
        }
      >
        {/* <Slider
          style={{ flex: 1 }}
          minimumValue={0}
          maximumValue={1}
          value={value}
          onSlidingStart={(_) => {
            startSeeking();
          }}
          onValueChange={(newValue) => {
            if (playbackState === "SEEKING") {
              setSeekPosition(newValue * duration);
            }
          }}
          onSlidingComplete={onSeekCompleted}
          minimumTrackTintColor={tw.color("blue")}
          maximumTrackTintColor={tw.color("blue-track")}
          thumbTintColor={tw.color("white")}
        /> */}
        <SkyhitzSlider minimumValue={0} maximumValue={1} value={value} />
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
