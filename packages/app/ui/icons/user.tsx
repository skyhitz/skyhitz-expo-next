import React from "react";
import Svg, { Path } from "react-native-svg";
import { IconProps } from "app/types";

function Icon({ color = "currentColor", size = 22 }: IconProps) {
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
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zm-4 7a7 7 0 00-7 7h14a7 7 0 00-7-7z"
      />
    </Svg>
  );
}

export default Icon;
