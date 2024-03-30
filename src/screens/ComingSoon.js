import React from "react";
import { ActivityIndicator, View } from "react-native";
import CustomText from "@components/CustomText";
import colors from "@constants/colors";

const ComingSoon = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primary,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CustomText>Coming soon</CustomText>
      <ActivityIndicator size="large" color={colors.secondary} />
    </View>
  );
};

export default ComingSoon;