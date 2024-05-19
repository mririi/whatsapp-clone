import React from 'react'
import { Linking, TouchableOpacity, View } from 'react-native'
import normalize from 'react-native-normalize'
import colors from '@constants/colors'
import Icon from "react-native-vector-icons/FontAwesome";
import CustomText from '@components/CustomText'
import { useDispatch } from 'react-redux';
import * as messagesActions from '@store/actions/contacts'

const CustomContactCard = (props) => {
  const dispatch = useDispatch();
  const { data, add } = props
  const handleCallPress = () => {
    if (data?.phone) {
      Linking.openURL(`tel:${data.phone}`);
      addPhoneCall(data.phone);
    } else {
      alert('Please enter a valid phone number');
    }
  }
  const addPhoneCall = async (phone) => {
    action = messagesActions.addPhoneCall(phone)
    try {
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  }
  const handleAddToContact = async () => {
    action = messagesActions.addToContacts(data?.pseudo)
    try {
      dispatch(action);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <View style={{
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
    }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{
          width: normalize(60),
          height: normalize(60),
          borderRadius: normalize(30),
          backgroundColor: colors.primary,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <CustomText style={{ fontSize: normalize(20), color: colors.textDark }}>{data?.pseudo.charAt(0).toUpperCase()}</CustomText>
        </View>
        <View style={{ marginLeft: normalize(20) }}>
          <CustomText style={{ fontSize: normalize(20), color: colors.textLight }}>{data?.pseudo} <CustomText style={{ fontSize: normalize(15), color: colors.textLight }}>({data?.fullName})</CustomText></CustomText>
          <CustomText style={{ fontSize: normalize(15), color: colors.textLight, textAlign: "left" }}>{data?.phone}</CustomText>
        </View>
      </View>
      <TouchableOpacity onPress={add ? handleAddToContact : handleCallPress} >
        <Icon name={add ? "plus" : "phone"} size={normalize(30)} color={colors.textLight} />
      </TouchableOpacity>
    </View>
  )
}

export default CustomContactCard