import React, { useState } from "react";
import Slider from "@react-native-community/slider";
import { tw } from "app/design-system/tailwind";
import { Text, View } from "app/design-system";

export function PlayerSlider() {
  const [value, setValue] = useState<number>(0.01);
  const songTime = 200;
  const currentTime = songTime * value;

  return (
    <View className="flex flex-row items-center justify-between w-full">
      <Text className="color-white text-xs mr-3">
        {Math.floor(currentTime / 60)}:
        {(currentTime % 60).toFixed().padStart(2, "0")}
      </Text>

      <Slider
        style={{ flex: 1 }}
        minimumValue={0}
        maximumValue={1}
        value={value}
        onSlidingStart={(_) => {
          console.log("sliding started");
        }}
        onSlidingComplete={(value) => {
          console.log("sliding ended");
          setValue(value);
        }}
        minimumTrackTintColor={tw.color("blue")}
        maximumTrackTintColor={tw.color("blue-track")}
        thumbTintColor={tw.color("white")}
      />
      <Text className="color-white text-xs ml-3">
        {(songTime / 60).toFixed()}:{(songTime % 60).toFixed()}
      </Text>
    </View>
  );
}
