import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import normalize from "react-native-normalize";
import Icon from "react-native-vector-icons/FontAwesome";
import colors from "@constants/colors";

const CustomTextInput = (props) => {
  const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    ...inputProps
  } = props;

  return (
    <View style={{ marginBottom: normalize(15, "height") }}>
      <View style={styles.container}>
        <Icon
          style={{ marginTop: 10 }}
          name={props.icon}
          size={25}
          color={colors.textDark}
        />
        <TextInput
          {...inputProps}
          style={{ ...styles.input, ...props.style }}
          placeholderTextColor={colors.textDark}
          value={value}
          onChangeText={(text) => onChange(name)(text)}
          onBlur={() => {
            setFieldTouched(name);
            onBlur(name);
          }}
        />
      </View>
      {errors[name] && touched[name] && (
        <Text style={styles.errorText}>{errors[name]}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomColor: "#B4B4B4",
    borderBottomWidth: 2,
    width: "80%",
  },
  input: {
    marginLeft: 10,
    width: "100%",
    height: 50,
    paddingLeft: 20,
    color: colors.textDark,
    fontFamily: "poppins-regular",
    fontWeight: "500",
    fontSize: 18,
  },
  errorContainer: {
    marginTop: 3,
  },
  errorText: {
    fontSize: 14,
    color: "#D24141",
  },
});
export default CustomTextInput;