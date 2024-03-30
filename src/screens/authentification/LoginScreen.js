import React from "react";
import {
  ActivityIndicator,
  Keyboard,
  View
} from "react-native";
import { KeyboardAvoidingScrollView } from "react-native-keyboard-avoiding-scroll-view";
import CustomButton from "@components/CustomButton";
import CustomTextInput from "@components/CustomTextInput";
import colors from "@constants/colors";
import { useDispatch } from "react-redux";
import * as authActions from "@store/actions/auth";
import { useEffect, useState } from "react";
import { Formik, Field } from "formik";
import Toast from "react-native-toast-message";
import * as yup from "yup";
import normalize from "react-native-normalize";
import CustomDarkBackground from "../../components/CustomDarkBackground";
import CustomText from "../../components/CustomText";
import CustomLoading from "../../components/CustomLoading";

const signInValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});
const Login = (props) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  //Handling the login button
  const LoginHandler = async (values, { resetForm }) => {
    Keyboard.dismiss();
    //Declaring the action
    action = authActions.login(values);
    setError(null);
    setIsLoading(true);
    try {
      //Dispatching the login action
      await dispatch(action);
      resetForm({ values: "" });
      props.navigation.navigate("bottomTabsNavigation");
      setIsLoading(false);
    } catch (err) {
      setError("Invalid credentials");
      setIsLoading(false);
    }
  };

  //Creating an error Alert
  useEffect(() => {
    if (error) {
      Toast.show({
        type: "error",
        text1: error,
        text2: "Please choose another email",
        visibilityTime: 6000,
        autoHide: true,
      });
    }
  }, [error]);

  return (
    <CustomDarkBackground>
      <Toast />
      {isLoading && <CustomLoading />}
      {!isLoading && <KeyboardAvoidingScrollView  style={{bottom:10}}>
        <View style={{
          marginTop: normalize(250, "height"),
          justifyContent: "center",
          alignItems: "center",
        }}>
          <Formik
            validationSchema={signInValidationSchema}
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={(values, { resetForm }) => {
              LoginHandler(values, { resetForm });
            }}
          >
            {({ handleSubmit, isValid }) => (
              <>
                <Field
                  component={CustomTextInput}
                  name="email"
                  icon="envelope"
                  placeholder="Email Address"
                  keyboardType="email-address"
                />
                <Field
                  component={CustomTextInput}
                  name="password"
                  icon="lock"
                  placeholder="Password"
                  secureTextEntry
                />
                {isLoading ? (
                  <ActivityIndicator size="small" color={colors.primary} />
                ) : (
                  <CustomButton
                    style={{ width: "80%" }}
                    title="Sign In"
                    onPress={handleSubmit}
                    disabled={!isValid}
                  />
                )}
              </>
            )}
          </Formik>
          <CustomText>
            Don't have an account?{" "}
            <CustomText
              style={{ color: colors.secondary }}
              onPress={() => props.navigation.navigate("register")}
            >
              Sign up
            </CustomText>
          </CustomText>
        </View>
      </KeyboardAvoidingScrollView>}
    </CustomDarkBackground>

  );
};
export default Login;