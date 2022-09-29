import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./src/navigations/Navigation";
import { useFonts } from "expo-font";
import { themes } from "./src/styles/colors";
import { useState } from "react";
import { Context } from "./src/context/context";
import { StatusBar } from "expo-status-bar";
import { store } from "./src/store/store";
import { Provider } from "react-redux";

export default function App() {
  const [theme, setTheme] = useState(themes.dark);

  const [fontsLoaded] = useFonts({
    "Franklin Gothic Medium": require("./assets/fonts/font.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }

  const changeTheme = () => {
    theme === themes.dark ? setTheme(themes.light) : setTheme(themes.dark);
  };

  return (
    <NavigationContainer>
      <Provider store={store}>
        <Context.Provider value={{ ...theme, changeTheme }}>
          <Navigation />
          <StatusBar style={theme === themes.dark ? "light" : "dark"} />
        </Context.Provider>
      </Provider>
    </NavigationContainer>
  );
}
