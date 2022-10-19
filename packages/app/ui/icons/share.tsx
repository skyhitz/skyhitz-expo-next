import { IconProps } from "app/types";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function ShareIcon({ color = "currentColor", size = 20 }: IconProps) {
  return (
    <Svg width={size} height={size} fill={color} viewBox="0 0 16 16">
      <Path d="M13.5 1a1.5 1.5 0 100 3 1.5 1.5 0 000-3zM11 2.5a2.5 2.5 0 11.603 1.628l-6.718 3.12a2.499 2.499 0 010 1.504l6.718 3.12a2.5 2.5 0 11-.488.876l-6.718-3.12a2.5 2.5 0 110-3.256l6.718-3.12A2.5 2.5 0 0111 2.5zm-8.5 4a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm11 5.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" />
    </Svg>
  );
}
