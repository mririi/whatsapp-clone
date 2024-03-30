import { NavigationContainer } from "@react-navigation/native";
import configureStore from "@store/configureStore";
import { Provider } from "react-redux";
import { useEffect, useState } from "react";
import * as Font from "expo-font";
import MainStackNavigation from "./src/navigation/MainStackNavigation";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const store = configureStore();
  useEffect(() => {
    const prepare = async() => {
      try {
        await Font.loadAsync({
          "poppins-regular": require("@assets/fonts/Poppins-Regular.ttf"),
          "poppins-bold": require("@assets/fonts/Poppins-Bold.ttf"),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  if (!appIsReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <MainStackNavigation />
      </NavigationContainer>
    </Provider>
  );
}