import React from 'react'
import { View } from 'react-native'
import normalize from 'react-native-normalize'
import colors from '@constants/colors'
import CustomText from './CustomText'

const CustomMessageContainer = (props) => {
    const {message, currentEmail} = props
  return (
    <>
    <View style={{
        alignSelf:currentEmail === message?.sender ? "flex-end":"flex-start",
        width:"50%",
     paddingVertical:normalize(10),
      paddingHorizontal:normalize(20),
      borderRadius:15,
      backgroundColor:currentEmail === message?.sender ? colors.secondaryDarker:"grey",
       borderColor:colors.primary,
       alignItems:"flex-start",
       borderWidth:4}}>
        <CustomText style={{fontSize:12}}>{message?.text}</CustomText>
    </View>
    </>
  )
}

export default CustomMessageContainer