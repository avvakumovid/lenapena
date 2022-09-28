import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { Audio } from "expo-av";
import { Context } from "../../context/context";
import PlayBtn from "./../../../assets/images/PlayBtn";

export default function AudioTask({ navigation }) {
  const { colors } = useContext(Context);
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
    <SafeAreaView style={styles.container}>
      {Platform.OS == "web" ? (
        <>
          <PlayBtn
            contentColor='#FFFFFF'
            externalBorderColor='#FF2CDF'
            internalBorderColor='rgba(255, 44, 223, 0.35)'
          />
          <Image
            source={{
              uri: require("../../../assets/images/bot_bg.png"),
            }}
            style={{ ...styles.botBgImg, width: 400, height: 400 }}
          />
        </>
      ) : (
        <>
          <Image
            style={styles.topBgImg}
            source={require("../../../assets/images/top_bg.png")}
          />
          <Image
            style={styles.botBgImg}
            source={require("../../../assets/images/bot_bg.png")}
          />
        </>
      )}
      <View style={styles.heading}>
        {Platform.OS == "web" && (
          <PlayBtn
            contentColor='#FFFFFF'
            externalBorderColor='#FF2CDF'
            internalBorderColor='rgba(255, 44, 223, 0.35)'
          />
        )}
        <TouchableOpacity
          onPress={() => {
            playSound();
            console.log("menu");
          }}
        >
          {
            <PlayBtn
              contentColor='#FFFFFF'
              externalBorderColor='#FF2CDF'
              internalBorderColor='rgba(255, 44, 223, 0.35)'
            />
          }
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
    </SafeAreaView>
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
    marginLeft: -35,
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
