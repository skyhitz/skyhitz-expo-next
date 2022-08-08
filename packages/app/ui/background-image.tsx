import React from 'react'
import { ImageBackground } from 'react-native'
import { SliderOverlay, LivePush } from 'app/assets/images/Images'

const BackgroundImage = () => (
  <ImageBackground
    source={LivePush}
    style={{
      width: '100%',
      height: '100%',
      position: 'absolute',
      left: 0,
      top: 0,
      zIndex: -1
    }}
    resizeMode="cover"
  >
    <ImageBackground
      source={SliderOverlay}
      style={{
        width: '100%',
        height: '100%',
      }}
      imageStyle={{ opacity: 0.9 }}
      resizeMode="repeat"
    >
    </ImageBackground>
  </ImageBackground>
)

export default BackgroundImage
