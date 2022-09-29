import { StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import Background from "./../../components/Background";
import { Context } from "../../context/context";
import StartBtn from "../../../assets/images/StartBtn";
import MoonBtn from "../../../assets/images/MoonBtn";
import SunBtn from "./../../../assets/images/SunBtn";
import { data } from "./../../../data/task";
import { useDispatch } from "react-redux";
import { setTasks } from "../../store/slice/tasksSlice";

const Menu = ({ navigation }) => {
  const { changeTheme, name, colors } = useContext(Context);
  const dispatch = useDispatch();
  dispatch(setTasks());
  return (
    <Background>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("starttask");
        }}
        style={styles.container}
      >
        <StartBtn {...colors.startBtn} />
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
