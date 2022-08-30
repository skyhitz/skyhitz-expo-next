import React from "react";
import Svg, { Path } from "react-native-svg";

function Icon({ size = 24, color = "currentColor" }) {
  return (
    <Svg
      fill="none"
      stroke={color}
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
      />
    </Svg>
  );
}

export default Icon;
