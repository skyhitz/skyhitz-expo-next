import React from "react";
import Svg, { Path } from "react-native-svg";

function Icon({ size = 24, color = "currentColor" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        fill={color}
        d="M14,14H19V16H16V19H14V14M5,14H10V19H8V16H5V14M8,5H10V10H5V8H8V5M19,8V10H14V5H16V8H19Z"
      />
    </Svg>
  );
}

export default Icon;
