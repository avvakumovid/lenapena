import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/SimpleLineIcons";

const Footer = ({ navigation, rightBtnCallback, leftBtnCallBack }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          if (leftBtnCallBack) {
            leftBtnCallBack();
          } else {
            navigation.goBack();
          }
        }}
      >
        <Icon name='arrow-left' size={25} color={"#704EF4"} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          navigation.navigate("menu");
        }}
      >
        <Image
          style={styles.goHome}
          source={require("../../assets/images/goHomeAlt.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          if (rightBtnCallback) {
            rightBtnCallback();
          } else {
            navigation.goBack();
          }
        }}
      >
        <Icon name='arrow-right' size={25} color={"#704EF4"} />
      </TouchableOpacity>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});
