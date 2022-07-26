import React from "react";
import Svg, { Path } from "react-native-svg";
import { IconProps } from "app/types";

function Icon({ size = 24, color = "currentColor" }: IconProps) {
  return (
    <Svg
      fill="none"
      stroke={color}
      viewBox="0 0 24 24"
      width={size}
      height={size}
    >
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </Svg>
  );
}

export default Icon;
