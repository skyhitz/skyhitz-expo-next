import React from "react"
import Svg, { Path } from "react-native-svg"

function Icon({ size = 24, color }) {
  return (
    <Svg
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 24 24"
      stroke={color ? color : "currentColor"}
      transform="scale(-1 1)"
    >
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </Svg>
  )
}

export default Icon
