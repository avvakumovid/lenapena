import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./src/navigations/Navigation";
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Franklin Gothic Medium": require("./assets/fonts/font.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
}
