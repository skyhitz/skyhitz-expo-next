import React from "react";
import Svg, { Circle } from "react-native-svg";

function Icon({ size = 24, color = "currentColor" }) {
  return (
    <Svg
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <Circle cx="12" cy="12" r="10" />
    </Svg>
  );
}

export default Icon;
