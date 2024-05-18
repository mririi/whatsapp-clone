import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import colors from "@constants/colors";
const CustomLoading = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color={colors.secondary} />
    </View>
  )
}

export default CustomLoading