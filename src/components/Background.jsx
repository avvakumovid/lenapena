import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  Image,
} from "react-native";
import React from "react";

const Background = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      {Platform.OS == "web" ? (
        <>
          <Image
            source={{
              uri: require("../../assets/images/top_bg.png"),
            }}
            style={{ ...styles.topBgImg, width: 400, height: 400 }}
          />
          <Image
            source={{
              uri: require("../../assets/images/bot_bg.png"),
            }}
            style={{ ...styles.botBgImg, width: 400, height: 400 }}
          />
        </>
      ) : (
        <>
          <Image
            style={styles.topBgImg}
            source={require("../../assets/images/top_bg.png")}
          />
          <Image
            style={styles.botBgImg}
            source={require("../../assets/images/bot_bg.png")}
          />
        </>
      )}
      {children}
    </SafeAreaView>
  );
};

export default Background;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#040313",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  botBgImg: {
    position: "absolute",
    bottom: 0,
  },
  topBgImg: {
    position: "absolute",
    right: 0,
  },
});