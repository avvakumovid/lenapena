import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Audio } from "expo-av";
import Background from "../../components/Background";
import Footer from "../../components/Footer";
import Icon from "react-native-vector-icons/MaterialIcons";

// const [widthScreen, heightScreen] = Dimensions.get("screen");
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
            // style={styles.imageWraper}
          >
            <Image
              // style={styles.pbtnImage}
              source={require("../../../assets/images/purplePlayBtn2.png")}
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
            source={require("../../../assets/images/qestion2.png")}
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
  imageWraper: {
    padding: 10,
    backgroundColor: "rgba(112, 78, 244, 0.15)",
    opacity: 1,
    borderRadius: 999,
  },
  pbtnImage: {},
  mainText: {
    fontFamily: "Franklin Gothic Medium",
    fontStyle: "italic",
    fontWeight: "400",
    fontSize: 32,
    textTransform: "uppercase",
    color: "#FFFFFF",
    marginLeft: 15,
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
    // width: widthScreen,
    flexDirection: "row",
    alignItems: "center",
    marginTop: "20%",
    marginBottom: "20%",
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
