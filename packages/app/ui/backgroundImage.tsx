import React from "react";
import { ImageBackground } from "react-native";
import { LivePush, SliderOverlay } from "app/assets/images/Images";

const BackgroundImage = () => (
  <ImageBackground
    source={LivePush}
    style={{
      position: "absolute",
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      zIndex: -1,
    }}
    resizeMode="cover"
  >
    <ImageBackground
      source={SliderOverlay}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
      }}
      imageStyle={{ opacity: 0.9 }}
      resizeMode="repeat"
    />
  </ImageBackground>
);

export default BackgroundImage;
