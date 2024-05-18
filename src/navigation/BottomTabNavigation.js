import React from "react";
import {
  Image,
  StyleSheet,
  View,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import colors from "@constants/colors";
import normalize from "react-native-normalize";
import CustomText from "@components/CustomText";
import Settings from "../screens/tabs/Settings";
import Contacts from "../screens/tabs/Contacts";
import Calls from "../screens/tabs/Calls";
import Home from "../screens/tabs/Home";
import ChatStackNavigation from "./ChatStackNavigation";

const Tab = createBottomTabNavigator();
const BottomTabsNavigation = () => {

  return (
    <View style={styles.screen}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            let IconSource;

            if (route.name === "home") {
              IconSource = require("@assets/images/home-focused-icon.png");
            } else if (route.name === "settings") {
              IconSource = require("@assets/images/user-focused-icon.png");
            }
            return (
              <>
                {!focused && (
                  <>
                    <Image
                      source={IconSource}
                      style={{
                        width: normalize(15),
                        height: normalize(15),
                        position: "absolute",
                        top: normalize(20),
                      }}
                    />
                    <CustomText
                      style={{
                        fontSize: normalize(12),
                        position: "absolute",
                        bottom: normalize(5),
                      }}
                    >
                      {route.name}
                    </CustomText>
                  </>
                )}
                {focused && (
                  <>
                    <View
                      style={{
                        borderWidth: 5,
                        borderColor: colors.primary,
                        width: normalize(55),
                        height: normalize(55),
                        borderRadius: normalize(55),
                        alignItems: "center",
                        justifyContent: "center",
                        position: "absolute",
                        top: normalize(-25),
                        backgroundColor: colors.secondary,
                      }}
                    >
                      <Image
                        source={IconSource}
                        style={{
                          width: normalize(15),
                          height: normalize(15),
                        }}
                      />
                    </View>
                    <CustomText
                      style={{
                        fontSize: normalize(12),
                        position: "absolute",
                        bottom: normalize(5),
                        color: colors.primary,
                      }}
                    >
                      {route.name}
                    </CustomText>
                  </>
                )}
              </>
            );
          },
          tabBarShowLabel: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: "black",
          tabBarLabelStyle: { fontSize: normalize(12) },
          tabBarStyle: {
            height: normalize(85),
            backgroundColor: colors.primary,
            borderTopWidth: 0,
          },
          tabBarItemStyle: {
            backgroundColor: colors.secondary,
            height: normalize(100),
            width: normalize(80),
            paddingBottom: normalize(35),
          },
        })}
      >
        <Tab.Screen name="home" component={Home} />
        <Tab.Screen
          name="contacts"
          component={Contacts}
          options={{
            title: "Contacts",
            tabBarLabel: "Contacts",
            tabBarItemStyle: {
              borderTopRightRadius: normalize(20),
              backgroundColor: colors.secondary,
              height: normalize(90),
            },
            tabBarIcon: ({ focused }) => (
              <>
                {!focused && (
                  <>
                    <Image
                      source={require("@assets/images/contacts.png")}
                      style={{
                        width: normalize(15),
                        height: normalize(15),
                        position: "absolute",
                        top: normalize(20),
                      }}
                    />
                    <CustomText
                      style={{
                        fontSize: normalize(12),
                        position: "absolute",
                        bottom: normalize(27),
                      }}
                    >
                      Contacts
                    </CustomText>
                  </>
                )}
                {focused && (
                  <>
                    <View
                      style={{
                        borderWidth: 5,
                        borderColor: colors.primary,
                        width: normalize(55),
                        height: normalize(55),
                        borderRadius: normalize(55),
                        alignItems: "center",
                        justifyContent: "center",
                        position: "absolute",
                        top: normalize(-25),
                        backgroundColor: colors.secondary,
                      }}
                    >
                      <Image
                        source={require("@assets/images/contacts.png")}
                        style={{
                          width: normalize(20),
                          height: normalize(20),
                        }}
                      />
                    </View>
                    <CustomText
                      style={{
                        fontSize: normalize(12),
                        position: "absolute",
                        bottom: normalize(27),
                        color: colors.primary,
                      }}
                    >
                      Contacts
                    </CustomText>
                  </>
                )}
              </>
            ),
          }}
        />
        <Tab.Screen
          name="Chat"
          component={ChatStackNavigation}
          options={{
            title: "",
            tabBarLabel: "Chat",
            tabBarIcon: ({ focused }) => (
              <>
                <View
                  style={{
                    backgroundColor: colors.primary,
                    width: "100%",
                    height: normalize(70),
                    borderBottomStartRadius: normalize(50),
                    borderBottomEndRadius: normalize(50),
                    position: "absolute",
                    top: 0,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    source={require("@assets/images/chat.png")
                    }
                    style={{
                      width: focused ? normalize(29) : normalize(25),
                      height: focused ? normalize(24) : normalize(20),
                      position: "absolute",
                      top: normalize(15),
                    }}
                  />
                </View>
              </>
            ),
          }}
        />
        <Tab.Screen
          name="calls"
          component={Calls}
          options={{
            title: "Calls",
            tabBarLabel: "Calls",
            tabBarItemStyle: {
              borderTopLeftRadius: normalize(20),
              backgroundColor: colors.secondary,
              height: normalize(90),
            },
            tabBarIcon: ({ focused }) => (
              <>
                {!focused && (
                  <>
                    <Image
                      source={require("@assets/images/calls.png")}
                      style={{
                        width: normalize(15),
                        height: normalize(15),
                        position: "absolute",
                        top: normalize(17),
                      }}
                    />
                    <CustomText
                      style={{
                        fontSize: normalize(12),
                        position: "absolute",
                        bottom: normalize(27),
                      }}
                    >
                      Calls
                    </CustomText>
                  </>
                )}
                {focused && (
                  <>
                    <View
                      style={{
                        borderWidth: 5,
                        borderColor: colors.primary,
                        width: normalize(55),
                        height: normalize(55),
                        borderRadius: normalize(55),
                        alignItems: "center",
                        justifyContent: "center",
                        position: "absolute",
                        top: normalize(-25),
                        backgroundColor: colors.secondary,
                      }}
                    >
                      <Image
                        source={require("@assets/images/calls.png")}
                        style={{
                          width: normalize(20),
                          height: normalize(20),
                        }}
                      />
                    </View>
                    <CustomText
                      style={{
                        fontSize: normalize(12),
                        position: "absolute",
                        bottom: normalize(27),
                        color: colors.primary,
                      }}
                    >
                      Calls
                    </CustomText>
                  </>
                )}
              </>
            ),
          }}
        />
        <Tab.Screen name="settings" component={Settings} />
      </Tab.Navigator>
    </View>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
export default BottomTabsNavigation;