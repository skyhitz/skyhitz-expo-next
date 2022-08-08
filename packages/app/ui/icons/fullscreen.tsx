import React from 'react'
import Svg, { Path } from 'react-native-svg'

function Icon({ size = 24, color }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        fill={color ? color : 'currentColor'}
        d="M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17V19H5V14H7V17H10Z"
      />
    </Svg>
  )
}

export default Icon
