import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import GetStartedScreen from "./src/screens/GetStartedScreen";
import LoginScreen from "./src/screens/authentification/LoginScreen";
import RegisterScreen from "./src/screens/authentification/RegisterScreen";
import Home from "./src/screens/Home";

export default function App() {

  //Declaring the stack navigator
  const Stack = createStackNavigator();
  return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="login" component={LoginScreen} />
          <Stack.Screen name="register" component={RegisterScreen} />
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen name="getStarted" component={GetStartedScreen} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}