import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Keyboard, Pressable, View } from 'react-native'
import * as contactsActions from '@store/actions/contacts';
import * as authActions from '@store/actions/auth';
import CustomDarkBackground from '../../components/CustomDarkBackground';
import CustomButton from '../../components/CustomButton';
import normalize from 'react-native-normalize';
import { Formik, Field } from "formik";
import * as yup from "yup";
import CustomTextInput from "@components/CustomTextInput";
import colors from "@constants/colors";
import { useDispatch, useSelector } from 'react-redux';
import Icon from "react-native-vector-icons/FontAwesome";

const validationSchema = yup.object().shape({
  fullName: yup
    .string()
    .required("Full name is required"),
  phone: yup
    .number(8)
    .typeError("Phone must be a number")
    .required("Phone is required"),
  pseudo: yup
    .string()
    .required("Pseudo is required"),
});

const Settings = ({ navigation }) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState({});
  const currentProfile = useSelector((state) => state.contacts.currentProfile);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred!', error, [{ text: 'Ok' }]);
    }
  }, [error]);

  useEffect(() => {
    if (!currentProfile) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [currentProfile]);

  useEffect(() => {
    if (currentProfile) {
      setProfile(currentProfile);
    }
  }, [currentProfile]);

  const loadProfile = useCallback(async () => {
    try {
      setError(null);
      await dispatch(contactsActions.fetchProfile());
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true);
    loadProfile();
  }, [loadProfile]);

  const LogoutHandler = () => {
    authActions.logout()
    dispatch(contactsActions.resetProfile())
    navigation.navigate('login')
  }

  const SaveHandler = async (values, edit) => {
    Keyboard.dismiss();
    setError(null);
    setIsLoading(true);
    //Declaring the action
    action = contactsActions.saveProfile(values, edit);
    try {
      //Dispatching the login action
      await dispatch(action);
      setIsLoading(false);
    } catch (err) {
      setError("Invalid credentials");
      setIsLoading(false);
    }
  };

  const getProfile = async () => {
    //Declaring the action
    action = contactsActions.fetchProfile();
    setError(null);
    setIsLoading(true);
    try {
      //Dispatching the login action
      await dispatch(action);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!currentProfile) {
      getProfile();
      setProfile(currentProfile);
    }
  }
    , [currentProfile]);
  return (
    <CustomDarkBackground>
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

      }}>
        <Icon name="user" size={normalize(80)} color={colors.secondary} />
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            pseudo: profile?.pseudo || "",
            fullName: profile?.fullName || "",
            phone: profile?.phone || "",
          }}
          enableReinitialize
          onSubmit={(values, { resetForm }) => {
            SaveHandler(values, !!profile?.pseudo);
          }}
        >
          {({ handleSubmit, isValid, values }) => (
            <>
              <Field
                component={CustomTextInput}
                name="pseudo"
                placeholder="Pseudo"
                disabled={!!profile?.pseudo}
              />
              <Field
                component={CustomTextInput}
                name="fullName"
                placeholder="Full name"
                keyboardType="email-address"
              />
              <Field
                component={CustomTextInput}
                name="phone"
                keyboardType="number-pad"
                placeholder="Phone number"
              />
              {isLoading ? (
                <ActivityIndicator size="small" color={colors.primary} />
              ) : (
                <CustomButton
                  title="Save"
                  onPress={handleSubmit}
                  disabled={!isValid}
                />
              )}
            </>
          )}
        </Formik>
        <Icon name="sign-out" style={{
          marginTop: normalize(50)
        }} size={normalize(80)} color={colors.secondary} onPress={LogoutHandler} />
      </View>
    </CustomDarkBackground>
  )
}

export default Settings