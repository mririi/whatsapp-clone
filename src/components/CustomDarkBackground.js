import React from 'react'
import { ImageBackground } from 'react-native'

const CustomDarkBackground = ({children,style}) => {
  return (
    <ImageBackground
        source={require('../../assets/images/bg.png')}
        style={{...{
            margin:0,
            width: '100%',
            height: '100%',
        }, ...style}}

      >
        {children}
        </ImageBackground>
  )
}

export default CustomDarkBackground