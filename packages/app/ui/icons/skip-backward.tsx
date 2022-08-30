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
      <Path d="M19 20L9 12 19 4 19 20z" />
      <Path d="M5 19L5 5" />
    </Svg>
  );
}
