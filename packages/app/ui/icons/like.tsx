import React from "react";
import Svg, { Path } from "react-native-svg";

function Icon({
  size = 24,
  fill = false,
  color = "currentColor",
}: {
  size: number;
  fill?: boolean;
  color?: string;
}) {
  return (
    <Svg
      fill={fill ? color : "none"}
      stroke={fill ? "none" : color}
      viewBox="0 0 24 24"
      width={size}
      height={size}
    >
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1"
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </Svg>
  );
}

export default Icon;
