import React from "react";
import Svg, { Path } from "react-native-svg";

function Icon({ color, size = 20 }) {
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
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </Svg>
  );
}

export default Icon;
