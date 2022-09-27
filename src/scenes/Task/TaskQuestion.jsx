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
import Footer from "../../components/Footer";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function TaskQuestion({ navigation }) {
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
      <View>
        <View style={styles.heading}>
          <TouchableOpacity
            onPress={() => {
              playSound();
              // console.log("menu");
              // navigation.navigate("menu");
            }}
          >
            <Image
              style={styles.pbtnImage}
              source={require("../../../assets/images/pbtn.png")}
            />
          </TouchableOpacity>
          <View style={styles.text}>
            <Text style={styles.mainText}>Держать слово</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("menu");
          }}
        >
          <Image
            style={styles.questionBtn}
            source={require("../../../assets/images/questionBtn.png")}
          />
        </TouchableOpacity>
      </View>
      <Footer navigation={navigation} />
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
  text: {},
  pbtnImage: {
    marginRight: 15,
  },
  mainText: {
    fontFamily: "Franklin Gothic Medium",
    fontStyle: "italic",
    fontWeight: "400",
    fontSize: 32,
    textTransform: "uppercase",
    color: "#FFFFFF",
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
    marginTop: "20%",
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
  questionBtn: {
    alignSelf: "center",
  },
});
