import React from 'react'
import Svg, { Path } from 'react-native-svg'

function Icon({ size = 24, color }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        fill={color ? color : 'currentColor'}
        d="M17,19H7V5H17M17,1H7C5.89,1 5,1.89 5,3V21A2,2 0 0,0 7,23H17A2,2 0 0,0 19,21V3C19,1.89 18.1,1 17,1Z"
      />
    </Svg>
  )
}

export default Icon
