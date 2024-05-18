import React from 'react'
import { Linking, View } from 'react-native'
import normalize from 'react-native-normalize'
import colors from '@constants/colors'
import Icon from "react-native-vector-icons/FontAwesome";
import CustomText from '@components/CustomText'
import { useDispatch } from 'react-redux';
import * as messagesActions from '@store/actions/contacts'
import moment from 'moment';
import { TouchableOpacity } from 'react-native-gesture-handler';

const CustomCallCard = (props) => {
  const dispatch = useDispatch();
  const { data } = props
  const dateTime = data?.timestamp && moment(data.timestamp).format('MMMM Do YYYY, h:mm:ss a')
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
      <View style={{ flexDirection: 'row' }}>
        <View style={{ marginLeft: normalize(20) }}>
          <CustomText style={{ fontSize: normalize(20), color: colors.textLight, textAlign: "left" }}>{data?.phone}</CustomText>
          <CustomText style={{ fontSize: normalize(15), color: colors.textLight, textAlign: "left" }}>{dateTime}</CustomText>
        </View>
      </View>
      <TouchableOpacity onPress={handleCallPress}>
        <Icon name="phone" size={normalize(30)} color={colors.textLight} />
      </TouchableOpacity>
    </View>
  )
}

export default CustomCallCard