import React from 'react'
import { View } from 'react-native'
import normalize from 'react-native-normalize'
import colors from '@constants/colors'
import CustomText from './CustomText'
import moment from 'moment'

const CustomMessageContainer = (props) => {
    const {message, currentEmail} = props
    const dateTime = message?.timestamp && moment(message.timestamp).format("DD/MM/YYYY HH:mm")
  return (
    <>
    <View style={{
        alignSelf:currentEmail === message?.sender ? "flex-end":"flex-start",
        width:"50%",
     paddingVertical:normalize(10),
      paddingHorizontal:normalize(10),
      borderRadius:15,
      backgroundColor:currentEmail === message?.sender ? colors.secondaryDarker:"grey",
       borderColor:colors.primary,
       alignItems:"flex-start",
       borderWidth:4}}>
        <CustomText style={{fontSize:12}}>{message?.text}</CustomText>
        <CustomText style={{fontSize:8,position:"absolute",bottom:2,right:normalize(5)}}>{dateTime}</CustomText>
    </View>
    </>
  )
}

export default CustomMessageContainer