import React from "react";
import Svg, { Path, Rect, Circle } from "react-native-svg";

function Image({ size = 24, color = "#000000" }) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Rect x="3" y="3" width="18" height="18" rx="2" />
      <Circle cx="8.5" cy="8.5" r="1.5" />
      <Path d="M20.4 14.5L16 10 4 20" />
    </Svg>
  );
}
export default Image;
