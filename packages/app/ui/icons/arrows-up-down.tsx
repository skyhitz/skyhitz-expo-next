import { IconProps } from "app/types";
import * as React from "react";
import Svg, { Path } from "react-native-svg";

export function ArrowsUpDownIcon({
  color = "currentColor",
  size = 24,
}: IconProps) {
  return (
    <Svg width={size} height={size} fill={color} viewBox="0 0 16 16">
      <Path
        fillRule="evenodd"
        d="M11.5 15a.5.5 0 00.5-.5V2.707l3.146 3.147a.5.5 0 00.708-.708l-4-4a.5.5 0 00-.708 0l-4 4a.5.5 0 10.708.708L11 2.707V14.5a.5.5 0 00.5.5zm-7-14a.5.5 0 01.5.5v11.793l3.146-3.147a.5.5 0 01.708.708l-4 4a.5.5 0 01-.708 0l-4-4a.5.5 0 01.708-.708L4 13.293V1.5a.5.5 0 01.5-.5z"
      />
    </Svg>
  );
}
