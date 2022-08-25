import React from "react";
import Svg, { Path } from "react-native-svg";

function Icon({ color, size = 24 }) {
  return (
    <Svg
      fill="none"
      stroke={color ? color : "currentColor"}
      viewBox="0 0 24 24"
      width={size}
      height={size}
    >
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 13l4 4L19 7"
      />
    </Svg>
  );
}

export default Icon;
