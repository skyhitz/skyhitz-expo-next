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
      <Path d="M16 3L21 3 21 8" />
      <Path d="M4 20L21 3" />
      <Path d="M21 16L21 21 16 21" />
      <Path d="M15 15L21 21" />
      <Path d="M4 4L9 9" />
    </Svg>
  );
}
