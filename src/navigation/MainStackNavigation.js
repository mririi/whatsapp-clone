import React from 'react'
import { Platform } from 'react-native';
import LoadingScreen from '@screens/LoadingScreen';
import LoginScreen from '@screens/authentification/LoginScreen';
import RegisterScreen from '@screens/authentification/RegisterScreen';
import BottomTabsNavigation from './BottomTabNavigation';
import { createStackNavigator } from '@react-navigation/stack';

const MainStackNavigation = () => {
    const Stack = createStackNavigator();
  return (
    <Stack.Navigator
          screenOptions={{
            headerShown: false,
            presentation: Platform.OS === "android" ? "modal" : null,
          }}
          cardStyle={{ backgroundColor: "transparent" }}
        >
          <Stack.Screen name="loading" component={LoadingScreen} />
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="register" component={RegisterScreen} />
          <Stack.Screen
            name="bottomTabsNavigation"
            component={BottomTabsNavigation}
          />
        </Stack.Navigator>
  )
}

export default MainStackNavigation