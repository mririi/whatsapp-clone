import React from "react";
import { Text } from "react-native";
import colors from "@constants/colors";

const CustomText = (props) => {
  return (
    <Text {...props} style={{
      ...{
        color: props.color || colors.textDark,
        fontFamily: "poppins-regular",
        fontWeight: "400",
        textAlign: "center"
      }, ...props.style
    }}>
      {props.children}
    </Text>
  );
};
export default CustomText;