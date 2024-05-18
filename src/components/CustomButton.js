import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import colors from "@constants/colors";
import normalize from "react-native-normalize";

const CustomButton = (props) => {
  return (
    <Pressable
      {...props}
      style={{
        ...{
          width: "75%",
          height: normalize(60, "height"),
          justifyContent: "center",
          alignItems: "center",
          borderRadius: normalize(10),
          backgroundColor: colors.secondary,
          opacity: props.disabled ? 0.5 : 1,
          marginVertical: normalize(10, "height"),
        }, ...props.style
      }}
      onPress={props.onPress}
    >
      <Text style={styles.title}>{props.title}</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  title: {
    color: "#FFFFFF",
    fontFamily: "poppins-regular",
    fontWeight: "400",
    fontSize: normalize(16),
  },
});

export default CustomButton;