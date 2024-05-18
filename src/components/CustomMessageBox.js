import React from 'react'
import { View } from 'react-native'
import normalize from 'react-native-normalize'
import colors from '@constants/colors'
import CustomText from '@components/CustomText'
import { TouchableOpacity } from 'react-native-gesture-handler'

const CustomMessageBox = (props) => {
    const { contact, onPress } = props
    return (
        <TouchableOpacity style={{
            width: "95%",
            height: normalize(100),
            backgroundColor: colors.secondary,
            padding: normalize(20),
            margin: normalize(10),
            borderRadius: normalize(10),
            flexDirection: 'row',
            alignItems: "center",
            alignSelf: "center",
            justifyContent: 'space-between'
        }}
            onPress={onPress}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{
                    width: normalize(60),
                    height: normalize(60),
                    borderRadius: normalize(30),
                    backgroundColor: colors.primary,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <CustomText style={{ fontSize: normalize(20), color: colors.textDark }}>{contact?.pseudo.charAt(0).toUpperCase()}</CustomText>
                </View>
                <View style={{ marginLeft: normalize(20) }}>
                    <CustomText style={{ fontSize: normalize(20), color: colors.textLight }}>{contact?.pseudo} <CustomText style={{ fontSize: normalize(15), color: colors.textLight }}>({contact?.fullName})</CustomText></CustomText>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default CustomMessageBox