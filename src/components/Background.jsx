import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Platform,
  Image,
} from "react-native";
import React, { useContext } from "react";
import { Context } from "../context/context";
import { BLACK, WHITE } from "./../styles/colors";

const Background = ({ children }) => {
  const { colors } = useContext(Context);

  return (
    <View style={{ ...styles.blur, backgroundColor: colors.backgroundColor }}>
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
    </View>
  );
};

export default Background;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(87, 83, 83, 0.17);",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },
  blur: { flex: 1 },
  botBgImg: {
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  topBgImg: {
    position: "absolute",
    right: 0,
  },
});
