import {
  Button,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import Background from "./../../components/Background";

// import TestImg from "../../../assets/images/test.svg";
import PlayBtn from "./../../../assets/images/PlayBtn";
import { Context } from "../../context/context";
import StartBtn from "../../../assets/images/StartBtn";
import MoonBtn from "../../../assets/images/MoonBtn";
import SunBtn from "./../../../assets/images/SunBtn";

const Menu = ({ navigation }) => {
  const { changeTheme, name, colors } = useContext(Context);
  // console.log(colors);
  return (
    <Background>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("starttask");
        }}
        style={styles.container}
      >
        {
          /* <Image
                  // style={styles.pbtnImage}
                  source={require(`../../../assets/images/lightPinkPlayBtn.png`)}
                /> */
          <StartBtn {...colors.startBtn} />
        }
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          changeTheme();
        }}
      >
        {name === "dark" ? <SunBtn /> : <MoonBtn />}
      </TouchableOpacity>
    </Background>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
