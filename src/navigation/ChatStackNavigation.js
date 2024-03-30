import React from 'react'
import { Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Chat from '../screens/tabs/Chat';
import ChatBox from '../screens/tabs/ChatBox';

const ChatStackNavigation = () => {
    const Stack = createStackNavigator();
  return (
    <Stack.Navigator
          screenOptions={{
            headerShown: false,
            presentation: Platform.OS === "android" ? "modal" : null,
          }}
          cardStyle={{ backgroundColor: "transparent" }}
        >
          <Stack.Screen name="chat" component={Chat} />
          <Stack.Screen name="chatBox" component={ChatBox} />
        </Stack.Navigator>
  )
}

export default ChatStackNavigation