import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { Audio } from "expo-av";
import Background from "../../components/Background";
import { Context } from "../../context/context";
import PlayBtn from "../../../assets/images/PlayBtn";

const widthScreen = Dimensions.get("screen").width;

export default function StartTask({ navigation }) {
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

  const styles = StyleSheet.create({
    title: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 15,
      width: widthScreen - widthScreen * 0.2,
    },
    subTitle: {
      alignSelf: "flex-end",
    },

    titleText: {
      fontFamily: "Franklin Gothic Medium",
      fontStyle: "italic",
      fontWeight: "400",
      fontSize: 32,
      textTransform: "uppercase",
      color: colors.headingTextColor,
    },
    subText: {
      fontFamily: "Franklin Gothic Medium",
      fontWeight: "400",
      fontStyle: "italic",
      fontSize: 20,
      textTransform: "uppercase",
      color: colors.mainTextColor,
    },
    heading: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: "55%",
    },
    playBtn: {
      marginRight: 13,
    },
  });
  return (
    <Background>
      <View style={styles.heading}>
        <View>
          <View style={styles.title}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("taskquestion");
              }}
            >
              <PlayBtn style={styles.playBtn} {...colors.pinkPlayBtn} />
            </TouchableOpacity>

            <Text style={styles.titleText}>Задание</Text>
          </View>
          <View style={styles.subTitle}>
            <Text style={styles.subText}>ПОСЛУШАЙ И ЗАПОМНИ</Text>
          </View>
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
