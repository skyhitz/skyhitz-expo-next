import React from "react";
import Svg, { Path } from "react-native-svg";

function Icon({ size = 24, color = "currentColor" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5.504 7.54c3.588-3.387 9.404-3.387 12.992 0l.432.408c.18.169.18.443 0 .613l-1.477 1.394a.24.24 0 01-.325 0l-.594-.56c-2.503-2.363-6.561-2.363-9.064 0l-.636.6a.24.24 0 01-.325 0L5.03 8.6a.417.417 0 010-.614l.474-.447zm16.047 2.884l1.315 1.24c.179.17.179.444 0 .614l-5.928 5.595c-.18.17-.47.17-.65 0l-4.207-3.971a.12.12 0 00-.162 0l-4.207 3.971c-.18.17-.47.17-.65 0l-5.927-5.596a.417.417 0 010-.613l1.314-1.24c.18-.17.47-.17.65 0l4.207 3.97a.12.12 0 00.162 0l4.207-3.97c.18-.17.47-.17.65 0l4.207 3.97a.12.12 0 00.162 0l4.207-3.97c.18-.17.47-.17.65 0z"
        fill={color}
      />
    </Svg>
  );
}

export default Icon;
