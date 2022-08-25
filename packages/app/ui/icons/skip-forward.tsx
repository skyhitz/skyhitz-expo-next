import React from "react";
import Svg, { Path } from "react-native-svg";

function Icon({ size = 24, color }) {
  return (
    <Svg
      width={size}
      height={size}
      fill="none"
      stroke={color ? color : "currentColor"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <Path d="M5 4L15 12 5 20 5 4z" />
      <Path d="M19 5L19 19" />
    </Svg>
  );
}

export default Icon;
