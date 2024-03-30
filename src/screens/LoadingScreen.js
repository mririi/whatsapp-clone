import React, { useEffect, useState } from "react";
import { auth } from "@firebaseConf";
import { ActivityIndicator, View } from "react-native";
import colors from "@constants/colors";
const LoadingScreen = (props) => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
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
            backgroundColor: colors.background,
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