import React from "react";
import Slider from "@react-native-community/slider";
import { tw } from "app/design-system/tailwind";
import { Text, View } from "app/design-system";
import { useRecoilValue } from "recoil";
import { currentDurationAtom, currentPositionAtom } from "app/state/playback";

export function PlayerSlider() {
  const duration = useRecoilValue(currentDurationAtom);
  const position = useRecoilValue(currentPositionAtom);
  const songTime = duration / 1000;
  const currentTime = position / 1000;
  const value = duration !== 0 ? position / duration : 0;

  return (
    <View className="flex flex-row items-center justify-between w-full">
      <Text className="text-white text-xs mr-3">
        {Math.floor(currentTime / 60)}:
        {(currentTime % 60).toFixed().padStart(2, "0")}
      </Text>

      <Slider
        style={{ flex: 1 }}
        minimumValue={0}
        maximumValue={1}
        value={value}
        onSlidingStart={(_) => {
          //TODO
        }}
        onSlidingComplete={(value) => {
          //TODO
        }}
        minimumTrackTintColor={tw.color("blue")}
        maximumTrackTintColor={tw.color("blue-track")}
        thumbTintColor={tw.color("white")}
      />
      <Text className="text-white text-xs ml-3">
        {(songTime / 60).toFixed()}:{(songTime % 60).toFixed().padStart(2, "0")}
      </Text>
    </View>
  );
}
