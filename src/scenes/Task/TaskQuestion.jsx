import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { Audio } from 'expo-av';
import Background from '../../components/Background';
import Footer from '../../components/Footer';
import { Context } from '../../context/context';
import PlayBtn from '../../../assets/images/PlayBtn';
import QestionBtn from './../../../assets/images/QestionBtn';
import { useSelector, useDispatch } from 'react-redux';
import { acceptTask } from '../../store/slice/tasksSlice';

export default function TaskQuestion({ navigation, route }) {
  const [sound, setSound] = useState();
  const [pressQestion, setPressQestion] = useState(false);
  const { tasks } = useSelector(state => state.tasks);
  const dispatch = useDispatch();
  let { taskIndex } = route.params;
  console.log(taskIndex);
  let { id, phrase, explanation, image, audio1, audio2, audio3, isAccepted } =
    tasks[taskIndex];
  // explanation = explanation.split(" ");
  const { colors } = useContext(Context);
  async function playSound(audio) {
    const { sound } = await Audio.Sound.createAsync(audio);
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }
  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);
  const styles = StyleSheet.create({
    text: {},
    imageWraper: {
      padding: 10,
      backgroundColor: 'rgba(112, 78, 244, 0.15)',
      opacity: 1,
      borderRadius: 999,
    },
    pbtnImage: {},
    mainText: {
      fontFamily: 'Franklin Gothic Medium',
      fontStyle: 'italic',
      fontWeight: '400',
      fontSize: 32,
      textTransform: 'uppercase',
      color: colors.mainTextColor,
      marginLeft: 15,
      // textAlign: "right",
      maxWidth: 300,
      // maxWidth: '90%',
    },

    heading: {
      // width: widthScreen,
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 100,
      // marginBottom: 34,
    },
    bottomPlayBtn: {
      alignSelf: 'center',
      marginTop: 32,
    },
    mainPicture: {
      alignSelf: 'center',
      // marginBottom: 51,
      marginTop: 32,
    },

    questionBtn: {
      marginTop: 102,
      alignSelf: 'center',
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
            <Text style={styles.mainText}>{phrase}</Text>
          </View>
        </View>
        {!pressQestion ? (
          <TouchableOpacity
            onPress={() => {
              setPressQestion(prev => !prev);
            }}
          >
            <QestionBtn style={styles.questionBtn} {...colors.qestionBtn} />
          </TouchableOpacity>
        ) : (
          <>
            <Image style={styles.mainPicture} source={image} />
            <View style={{ ...styles.heading, marginTop: 51 }}>
              <TouchableOpacity
                onPress={() => {
                  playSound(audio2);
                }}
              >
                <PlayBtn
                  style={styles.pbtnImage}
                  {...colors.lightPinkPlayBtn}
                />
              </TouchableOpacity>
              <View style={styles.text}>
                <Text style={styles.mainText}>{explanation}</Text>
                {/* <Text style={styles.mainText}>{explanation[0]}</Text> */}
              </View>
            </View>
            {/* {explanation.slice(1).map((w, i) => (
              <Text
                key={i}
                style={{ ...styles.mainText, marginLeft: 78 + (i + 1) * 20 }}
              >
                {w}
              </Text>
            ))} */}

            <TouchableOpacity
              onPress={() => {
                // dispatch(acceptTask(taskIndex));
                playSound(audio3);
                // navigation.navigate('starttask', { taskIndex });
              }}
              style={styles.bottomPlayBtn}
            >
              <PlayBtn {...colors.purplePlayBtn} />
            </TouchableOpacity>
          </>
        )}
      </View>
      <Footer
        navigation={navigation}
        rightBtnCallback={() => {
          const subTitle =
            taskIndex == tasks.length - 1
              ? 'ПОСЛУШАЙ И соедени картинки правильно'
              : 'ПОСЛУШАЙ И ЗАПОМНИ';
          navigation.navigate('starttask', {
            taskIndex,
            subTitle,
          });
        }}
      />
    </Background>
  );
}
