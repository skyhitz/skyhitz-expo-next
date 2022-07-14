import React from 'react'
import { ImageBackground } from 'react-native'
import { SliderOverlay, LivePush } from 'app/assets/images/Images'

const BackgroundImage = (props: any) => (
  <ImageBackground
    source={LivePush}
    style={{
      width: '100%',
      height: '100%',
    }}
    resizeMode="cover"
  >
    <ImageBackground
      source={SliderOverlay}
      style={[
        {
          width: '100%',
          height: '100%',
        },
        props.authBackground
          ? {
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }
          : {},
      ]}
      imageStyle={{ opacity: 0.9 }}
      resizeMode="repeat"
    >
      {props.children}
    </ImageBackground>
  </ImageBackground>
)

export default BackgroundImage
