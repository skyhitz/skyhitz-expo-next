import React from "react"
import Svg, { Path } from "react-native-svg"

function Icon({ size = 24, color }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        fill={color ? color : "currentColor"}
        d="M6 17c0-2 4-3.1 6-3.1s6 1.1 6 3.1v1H6m9-9a3 3 0 01-3 3 3 3 0 01-3-3 3 3 0 013-3 3 3 0 013 3M3 5v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2z"
      />
    </Svg>
  )
}

export default Icon
