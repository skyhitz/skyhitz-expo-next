import React from "react";
import Svg, { Path } from "react-native-svg";

function Icon({ size = 24, color }: { size: number; color?: string }) {
  return (
    <Svg
      fill="none"
      stroke={color ? color : "currentColor"}
      width={size}
      height={size}
      viewBox="0 0 24 24"
    >
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 9l-7 7-7-7"
      />
    </Svg>
  );
}

export default Icon;
