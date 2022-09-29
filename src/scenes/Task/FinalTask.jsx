import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { Audio } from "expo-av";
import Background from "../../components/Background";
import Footer from "../../components/Footer";
import { Context } from "../../context/context";
import PlayBtn from "../../../assets/images/PlayBtn";
import QestionBtn from "./../../../assets/images/QestionBtn";
import { useSelector, useDispatch } from "react-redux";
import { acceptTask } from "../../store/slice/tasksSlice";

export default function FinalTask({ navigation, route }) {
  const [sound, setSound] = useState();

  const [pressQestion, setPressQestion] = useState(false);
  const { tasks } = useSelector(state => state.tasks);
  const dispatch = useDispatch();
  console.log(tasks[0]);
  let phrase1 = tasks[0].phrase,
    image1 = tasks[0].image,
    audio1 = tasks[0].audio,
    isAccepted1 = tasks[0].isAccepted;

  let phrase2 = tasks[1].phrase,
    image2 = tasks[1].image,
    audio2 = tasks[1].audio,
    isAccepted2 = tasks[1].isAccepted;

  const { colors } = useContext(Context);
  async function playSound(audio) {
    const { sound } = await Audio.Sound.createAsync(audio);
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
      // textAlign: "right",
      maxWidth: 370,
    },

    heading: {
      // width: widthScreen,
      flexDirection: "row",
      alignItems: "center",
      marginTop: 64,
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
      width: 190,
      height: 190,
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
              playSound(audio1);
            }}
          >
            <PlayBtn style={styles.pbtnImage} {...colors.purplePlayBtn} />
          </TouchableOpacity>
          <View style={styles.text}>
            <Text style={styles.mainText}>{phrase1}</Text>
          </View>
        </View>
        <View style={{ ...styles.heading, marginTop: 36 }}>
          <TouchableOpacity
            onPress={() => {
              playSound(audio2);
            }}
          >
            <PlayBtn style={styles.pbtnImage} {...colors.purplePlayBtn} />
          </TouchableOpacity>
          <View style={styles.text}>
            <Text style={styles.mainText}>{phrase2}</Text>
          </View>
        </View>
        <View
          style={{
            ...styles.heading,
            marginTop: 36,
            alignSelf: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              playSound(audio1);
            }}
          >
            <PlayBtn
              style={{ ...styles.pbtnImage, marginRight: 12 }}
              {...colors.pinkPlayBtn}
            />
          </TouchableOpacity>
          <Image style={styles.mainPicture} source={image1} />
        </View>
        <View
          style={{
            ...styles.heading,
            marginTop: 36,
            alignItems: "flex-end",
          }}
        >
          <Image
            style={{ ...styles.mainPicture, marginRight: 12 }}
            source={image2}
          />
          <TouchableOpacity
            onPress={() => {
              playSound(audio2);
            }}
          >
            <PlayBtn style={styles.pbtnImage} {...colors.pinkPlayBtn} />
          </TouchableOpacity>
        </View>
      </View>
      <Footer navigation={navigation} />
    </Background>
  );
}
