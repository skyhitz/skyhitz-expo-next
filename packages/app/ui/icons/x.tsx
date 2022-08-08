import React from "react"
import Svg, { Path } from "react-native-svg"

function Icon({ color, size = 24 }: { color: string; size?: number }) {
  return (
    <Svg
      fill="none"
      stroke={color ? color : "currentColor"}
      viewBox="0 0 24 24"
      width={size}
      height={size}
    >
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </Svg>
  )
}

export default Icon
