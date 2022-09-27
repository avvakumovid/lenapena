import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Audio } from "expo-av";
import Background from "../../components/Background";

export default function StartTask({ navigation }) {
  const [sound, setSound] = useState();
  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("../../../assets/sounds/keepYourWord.mp3")
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }
  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  return (
    <Background>
      <View style={styles.heading}>
        {Platform.OS == "web" && (
          <Image
            //   style={styles.botBgImg}
            source={require("../../../assets/images/play_btn.png")}
            style={{ width: 120, height: 120 }}
          />
        )}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("taskquestion");
          }}
        >
          <Image source={require("../../../assets/images/pinkPlayBtn.png")} />
        </TouchableOpacity>
        <View style={styles.text}>
          <Text style={styles.mainText}>Задание</Text>
          <Text style={styles.subText}>ПОСЛУШАЙ И ЗАПОМНИ</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("menu");
        }}
      >
        <Image
          style={styles.goHome}
          source={require("../../../assets/images/goHomeAlt.png")}
        />
      </TouchableOpacity>
    </Background>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#040313",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingVertical: 20,
  },
  text: {
    // marginLeft: -35,
  },
  mainText: {
    fontFamily: "Franklin Gothic Medium",
    fontStyle: "italic",
    fontWeight: "400",
    fontSize: 32,
    textTransform: "uppercase",
    color: "#FF2CDF",
  },
  subText: {
    fontFamily: "Franklin Gothic Medium",
    fontWeight: "400",
    fontStyle: "italic",
    fontSize: 20,
    textTransform: "uppercase",
    color: "#FFFFFF",
  },
  heading: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "55%",
  },
  botBgImg: {
    position: "absolute",
    bottom: 0,
  },
  topBgImg: {
    position: "absolute",
    right: 0,
  },
  goHome: {
    alignSelf: "center",
  },
});
