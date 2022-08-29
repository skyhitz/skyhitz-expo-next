import React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  size?: number;
  color?: string;
};

export default function Icon({ size = 24, color }: Props) {
  return (
    <Svg
      width={size}
      height={size}
      fill="none"
      stroke={color ? color : "currentColor"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <Path d="M6 4H10V20H6z" />
      <Path d="M14 4H18V20H14z" />
    </Svg>
  );
}
