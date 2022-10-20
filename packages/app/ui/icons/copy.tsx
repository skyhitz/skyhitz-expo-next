import { IconProps } from "app/types";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function CopyIcon({ color = "currentColor", size = 20 }: IconProps) {
  return (
    <Svg viewBox="0 0 256 256" width={size} height={size}>
      <Path fill="none" d="M0 0H256V256H0z" />
      <Path
        fill={color}
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={8}
        d="M168 168L216 168 216 40 88 40 88 88"
      />
      <Path
        fill={color}
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={8}
        d="M40 88H168V216H40z"
      />
    </Svg>
  );
}
