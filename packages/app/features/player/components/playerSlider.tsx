import React, { useState } from "react";
import { Pressable } from "react-native";
import Slider from "@react-native-community/slider";
import { useEffect } from "react";
import { tw } from "app/design-system/tailwind";

export function PlayerSlider() {
  // TODO remove that
  const [value, setValue] = useState<number>(0.01);

  useEffect(() => {
    setTimeout(() => {
      setValue((prev) => (prev + 0.01) % 1);
    }, 1000);
  }, [value]);

  return (
    <Pressable
      onPressOut={(evt) => {
        console.log("press out", evt);
      }}
      onLayout={(evt) => {
        console.log("layout", evt);
      }}
      style={{
        zIndex: 15,
        flex: 1,
      }}
    >
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
        maximumTrackTintColor={tw.color("blue")}
        thumbTintColor={tw.color("white")}
      />
    </Pressable>
  );
}
