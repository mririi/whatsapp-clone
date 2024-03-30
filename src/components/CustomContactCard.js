import React from 'react'
import { View } from 'react-native'
import normalize from 'react-native-normalize'
import colors from '@constants/colors'
import Icon from "react-native-vector-icons/FontAwesome";
import CustomText from '@components/CustomText'

const CustomContactCard = (props) => {
    const {data} = props
  return (
    <View style={{
        width:"95%",
        height: normalize(100),
        backgroundColor: colors.secondary,
        padding: normalize(20),
        margin: normalize(10),
        borderRadius: normalize(10),
        flexDirection: 'row',
        alignItems: "center",
        alignSelf:"center",
        justifyContent: 'space-between'
    }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{
                width: normalize(60),
                height: normalize(60),
                borderRadius: normalize(30),
                backgroundColor: colors.primary,
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <CustomText style={{fontSize: normalize(20), color: colors.textDark}}>{data?.name.charAt(0).toUpperCase()}</CustomText>
            </View>
            <View style={{marginLeft: normalize(20)}}>
                <CustomText style={{fontSize: normalize(20), color: colors.textLight}}>{data?.name}</CustomText>
                <CustomText style={{fontSize: normalize(15), color: colors.textLight}}>{data?.phone}</CustomText>
            </View>
        </View>
        <Icon name="phone" size={normalize(30)} color={colors.textLight} />
    </View>
  )
}

export default CustomContactCard