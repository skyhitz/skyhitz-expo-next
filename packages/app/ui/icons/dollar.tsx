import React from 'react'
import Svg, { G, Path } from 'react-native-svg'
import { tw } from 'app/design-system/tailwind'

function Icon({
  size = 24,
  color,
  className,
}: {
  size: number
  color: string
  className?: string
}) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 236.36 200"
      style={tw.style(className)}
    >
      <G id="Layer_2" data-name="Layer 2">
        <G id="Layer_1-2" data-name="Layer 1" fill={color ? color : 'white'}>
          <Path d="M203,26.16l-28.46,14.5-137.43,70a82.49,82.49,0,0,1-.7-10.69A81.87,81.87,0,0,1,158.2,28.6l16.29-8.3,2.43-1.24A100,100,0,0,0,18.18,100q0,3.82.29,7.61a18.19,18.19,0,0,1-9.88,17.58L0,129.57V150l25.29-12.89,0,0,8.19-4.18,8.07-4.11v0L186.43,55l16.28-8.29,33.65-17.15V9.14Z" />
          <Path d="M236.36,50,49.78,145,33.5,153.31,0,170.38v20.41l33.27-16.95,28.46-14.5L199.3,89.24A83.45,83.45,0,0,1,200,100,81.87,81.87,0,0,1,78.09,171.36l-1,.53-17.66,9A100,100,0,0,0,218.18,100c0-2.57-.1-5.14-.29-7.68a18.2,18.2,0,0,1,9.87-17.58l8.6-4.38Z" />
        </G>
      </G>
    </Svg>
  )
}

export default Icon
