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
import React, { useState, useEffect, useContext } from "react";
import { Audio } from "expo-av";
import Background from "../../components/Background";
import Footer from "../../components/Footer";
import { Context } from "../../context/context";
import PlayBtn from "../../../assets/images/PlayBtn";
import QestionBtn from "./../../../assets/images/QestionBtn";

export default function TaskQuestion({ navigation }) {
  const [sound, setSound] = useState();
  const [pressQestion, setPressQestion] = useState(false);

  const {colors} = useContext(Context);
  async function playSound() {
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
      color: colors.mainTextColor,
      marginLeft: 15,
      textAlign: "right",
      maxWidth: 370,
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
      // width: widthScreen,
      flexDirection: "row",
      alignItems: "center",
      marginTop: 121,
      // marginBottom: 34,
    },
    bottomPlayBtn: {
      alignSelf: "center",
      marginTop: 32,
    },
    mainPicture: {
      alignSelf: "center",
      // marginBottom: 51,
      marginTop: 32,
    },

    goHome: {
      alignSelf: "center",
    },
    questionBtn: {
      marginTop: 102,
      alignSelf: "center",
    },
  });
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
            {
              /* <Image
              // style={styles.pbtnImage}
              source={require("../../../assets/images/lightPinkPlayBtn.png")}
            /> */
              <PlayBtn style={styles.pbtnImage} {...colors.purplePlayBtn} />
            }
          </TouchableOpacity>
          <View style={styles.text}>
            <Text style={styles.mainText}>Держать слово</Text>
          </View>
        </View>
        {!pressQestion ? (
          <TouchableOpacity
            onPress={() => {
              setPressQestion(prev => !prev);
            }}
          >
            {
              /* <Image
              style={styles.questionBtn}
              source={require(`../../../assets/images/lightPinkPlayBtn.png`)}
            /> */
              <QestionBtn style={styles.questionBtn} {...colors.qestionBtn} />
            }
          </TouchableOpacity>
        ) : (
          <>
            <Image
              style={styles.mainPicture}
              source={require("../../../assets/images/promise.png")}
            />
            <View style={{ ...styles.heading, marginTop: 51 }}>
              <TouchableOpacity
                onPress={() => {
                  playSound();
                  // console.log("menu");
                  // navigation.navigate("menu");
                }}
                // style={styles.imageWraper}
              >
                {
                  /* <Image
                  // style={styles.pbtnImage}
                  source={require(`../../../assets/images/lightPinkPlayBtn.png`)}
                /> */
                  <PlayBtn style={styles.pbtnImage} {...colors.purplePlayBtn} />
                }
              </TouchableOpacity>
              <View style={styles.text}>
                <Text style={styles.mainText}>Выполнить ОБЕЩАННОЕ</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                playSound();
                // console.log("menu");
                // navigation.navigate("menu");
              }}
              style={styles.bottomPlayBtn}
            >
              {
                /* <Image
                  // style={styles.pbtnImage}
                  source={require(`../../../assets/images/lightPinkPlayBtn.png`)}
                /> */
                <PlayBtn {...colors.lightPinkPlayBtn} />
              }
            </TouchableOpacity>
          </>
        )}
      </View>
      <Footer navigation={navigation} />
    </Background>
  );
}
