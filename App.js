import { NavigationContainer, ThemeProvider } from "@react-navigation/native";
import Navigation from "./src/navigations/Navigation";
import { useFonts } from "expo-font";
import {
  WHITE,
  BLACK,
  lightThemeColors,
  darkThemeColors,
  themes,
} from "./src/styles/colors";
import { createContext, useState, useEffect } from "react";
import { Context } from "./src/context/context";

export default function App() {
  // console.log(themes.dark);
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
      <Context.Provider value={{ ...theme, changeTheme }}>
        <Navigation />
      </Context.Provider>
    </NavigationContainer>
  );
}
