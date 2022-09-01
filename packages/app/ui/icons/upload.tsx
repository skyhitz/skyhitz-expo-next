import React from "react";
import Svg, { Path } from "react-native-svg";

function Icon({ size = 24, color = "currentColor" }) {
  return (
    <Svg
      fill="none"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      stroke={color}
    >
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
      />
    </Svg>
  );
}

export default Icon;
