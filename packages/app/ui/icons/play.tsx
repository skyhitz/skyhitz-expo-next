import React from 'react'
import Svg, { Path } from 'react-native-svg'

function Icon({ size = 24, color }) {
  return (
    <Svg
      fill="none"
      stroke={color ? color : 'currentColor'}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <Path d="M5 3L19 12 5 21 5 3z" />
    </Svg>
  )
}

export default Icon
