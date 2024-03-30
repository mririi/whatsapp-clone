import React from 'react'
import { View } from 'react-native'
import * as authActions from '@store/actions/auth';
import CustomDarkBackground from '../../components/CustomDarkBackground';
import CustomButton from '../../components/CustomButton';

const Settings = ({navigation}) => {
  const LogoutHandler = () => {
    authActions.logout()
    navigation.navigate('login')
  }
  return (
    <CustomDarkBackground>
        <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    
        }}>
            <CustomButton title="Logout" onPress={LogoutHandler} />
        </View>
    </CustomDarkBackground>
  )
}

export default Settings