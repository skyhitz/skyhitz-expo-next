import React from "react";
import Svg, { Circle } from "react-native-svg";

function Icon({ size = 24, color = "currentColor" }) {
  return (
    <Svg
      width={size}
      height={size}
      fill={color}
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 60 60"
    >
      <Circle cx="30" cy="45" r="2" />
      <Circle cx="30" cy="30" r="2" />
      <Circle cx="30" cy="15" r="2" />
    </Svg>
  );
}

export default Icon;
