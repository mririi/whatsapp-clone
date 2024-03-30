import React, { useEffect, useState } from "react";
import { auth } from "@firebaseConf";
import { ActivityIndicator, View } from "react-native";
import colors from "@constants/colors";
import { useDispatch } from "react-redux";
import { AUTHENTICATE } from "@store/actions/auth";
const LoadingScreen = (props) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({ type: AUTHENTICATE, email: user.email });
        props.navigation.navigate("bottomTabsNavigation");
        setLoading(false);
      } else {
        props.navigation.navigate("login");
        setLoading(false);
      }
    });
  }, [auth.onAuthStateChanged]);
  return (
    <>
      {loading && (
        <View
          style={{
            backgroundColor: colors.primary,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size={50} color={colors.third} />
        </View>
      )}
    </>
  );
};

export default LoadingScreen;