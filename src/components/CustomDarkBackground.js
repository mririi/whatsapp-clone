import React from 'react'
import { View } from 'react-native'
import colors from '@constants/colors'
import normalize from 'react-native-normalize'
const CustomDarkBackground = ({children,style}) => {
  return (
    <View
        style={{...{
            flex: 1,
            backgroundColor: colors.primary,
            paddingVertical:normalize(40)
        }, ...style}}

      >
        {children}
        </View>
  )
}

export default CustomDarkBackground