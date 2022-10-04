import React from "react";
import Svg, { Path } from "react-native-svg";
import { IconProps } from "app/types";

function Icon({ size = 24, color = "currentColor" }: IconProps) {
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
        d="M19 9l-7 7-7-7"
      />
    </Svg>
  );
}

export default Icon;
