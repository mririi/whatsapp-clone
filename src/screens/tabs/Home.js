import React from 'react'
import ComingSoon from '../ComingSoon'
import CustomText from '../../components/CustomText'
import { View } from 'react-native'
import CustomDarkBackground from '../../components/CustomDarkBackground'
import normalize from 'react-native-normalize'

const Home = () => {
  return (
    <CustomDarkBackground>
    <View style={{
      flex: 1,
      justifyContent: 'center',
      marginHorizontal:normalize(20)
    }}>
      <CustomText style={{fontSize: 15,textAlign:"left",marginBottom:normalize(20)}}>Features:</CustomText> 
      <CustomText style={{fontSize: 18,textAlign:"left",marginBottom:normalize(10)}}>* Authentication using Email/Password</CustomText> 
      <CustomText style={{fontSize: 18,textAlign:"left",marginBottom:normalize(10)}}>* Auto login + logout</CustomText> 
      <CustomText style={{fontSize: 18,textAlign:"left",marginBottom:normalize(10)}}>* Modern bottom navigation</CustomText> 
      <CustomText style={{fontSize: 18,textAlign:"left",marginBottom:normalize(10)}}>* Contacts List</CustomText>
      <CustomText style={{fontSize: 18,textAlign:"left",marginBottom:normalize(10)}}>* Calls history through the app</CustomText> 
      <CustomText style={{fontSize: 18,textAlign:"left",marginBottom:normalize(10)}}>* Modern bottom navigation</CustomText> 
      <CustomText style={{fontSize: 18,textAlign:"left",marginBottom:normalize(10)}}>* Realtime Chat</CustomText> 
      <CustomText style={{fontSize: 15,textAlign:"left",marginBottom:normalize(10)}}>Bugs:</CustomText> 
      <CustomText style={{fontSize: 18,textAlign:"left",marginBottom:normalize(10)}}>* ChatBox message input scroll avoid view</CustomText>
    </View>
    </CustomDarkBackground>
  )
}

export default Home