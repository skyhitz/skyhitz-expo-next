import React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  size?: number;
  color?: string;
};

export default function Icon({ size = 24, color = "currentColor" }: Props) {
  return (
    <Svg
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <Path d="M17 1L21 5 17 9" />
      <Path d="M3 11V9a4 4 0 014-4h14" />
      <Path d="M7 23L3 19 7 15" />
      <Path d="M21 13v2a4 4 0 01-4 4H3" />
    </Svg>
  );
}
