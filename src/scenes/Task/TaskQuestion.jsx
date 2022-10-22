import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions,
  Animated,
} from 'react-native';
import React, { useState, useEffect, useContext, useRef } from 'react';
import { Audio } from 'expo-av';
import Background from '../../components/Background';
import Footer from '../../components/Footer';
import { Context } from '../../context/context';
import { useSelector, useDispatch } from 'react-redux';
import { acceptTask } from '../../store/slice/tasksSlice';
import QestionBtn from './../../components/icons/QestionBtn';
import PlayBtn from './../../components/icons/PlayBtn';

const widthScreen = Dimensions.get('screen').width;

export default function TaskQuestion({ navigation, route }) {
  const fadeBtnAnim = useRef(new Animated.Value(1)).current;
  const fadeMainAnim = useRef(new Animated.Value(0)).current;
  const [sound, setSound] = useState();
  const [pressQestion, setPressQestion] = useState(false);
  const { tasks } = useSelector(state => state.tasks);
  const dispatch = useDispatch();
  let { taskIndex } = route.params;
  let { id, phrase, explanation, image, audio1, audio2, audio3, isAccepted } =
    tasks[taskIndex];
  const { name, colors } = useContext(Context);
  async function playSound(audio) {
    const { sound } = await Audio.Sound.createAsync(audio);
    setSound(sound);
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
    container: {
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      paddingHorizontal: 30,
      width: widthScreen,
      maxWidth: 960,
    },
    text: {},
    pbtnImage: {},
    mainText: {
      fontFamily: 'Franklin Gothic Medium',
      fontStyle: 'italic',
      fontWeight: '400',
      fontSize: 32,
      textTransform: 'uppercase',
      color: colors.mainTextColor,
      marginLeft: 15,
      flexWrap: 'wrap',
      maxWidth: widthScreen - 120,
    },

    heading: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 100,

      // paddingHorizontal: 20,
    },
    bottomPlayBtn: {
      marginTop: 32,
      alignSelf: 'center',
    },
    mainPicture: {
      marginTop: 32,
      alignSelf: 'center',
    },
    questionBtn: {
      marginTop: 102,
      alignSelf: 'center',
    },
  });
  return (
    <Background>
      <View style={styles.container}>
        <View
          style={[
            styles.heading,
            Platform.OS == 'web' ? { marginTop: 60 } : {},
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              playSound(audio1);
            }}
          >
            {Platform.OS === 'web' ? (
              <Image
                source={{
                  uri:
                    name == 'dark'
                      ? require('../../../assets/web/playbtn1L.svg')
                      : require('../../../assets/web/playbtn1D.svg'),
                }}
                style={[{ width: 70, height: 70 }]}
              />
            ) : (
              <PlayBtn style={styles.pbtnImage} {...colors.purplePlayBtn} />
            )}
          </TouchableOpacity>
          <View style={styles.text}>
            <Text style={styles.mainText}>{phrase}</Text>
          </View>
        </View>
        {!pressQestion ? (
          <Animated.View
            style={[
              styles.questionBtn,
              {
                opacity: fadeBtnAnim,
              },
            ]}
          >
            <TouchableOpacity
              onPress={async () => {
                fadeOut(fadeBtnAnim);
                setTimeout(() => {
                  setPressQestion(true);
                  fadeIn(fadeMainAnim);
                }, 150);
              }}
            >
              {Platform.OS === 'web' ? (
                <Image
                  source={{
                    uri:
                      name == 'dark'
                        ? require('../../../assets/web/qestionbtnL.svg')
                        : require('../../../assets/web/qestionbtnD.svg'),
                  }}
                  style={{ width: 190, height: 190 }}
                />
              ) : (
                <QestionBtn {...colors.qestionBtn} />
              )}
            </TouchableOpacity>
          </Animated.View>
        ) : (
          <Animated.View
            style={{
              width: '100%',
              opacity: fadeMainAnim,
            }}
          >
            {Platform.OS === 'web' ? (
              <Image
                source={{
                  uri: image,
                }}
                style={[styles.mainPicture, { width: 270, height: 270 }]}
              />
            ) : (
              <Image style={styles.mainPicture} source={image} />
            )}

            <View style={{ ...styles.heading, marginTop: 32 }}>
              <TouchableOpacity
                onPress={() => {
                  playSound(audio2);
                }}
              >
                {Platform.OS === 'web' ? (
                  <Image
                    source={{
                      uri:
                        name == 'dark'
                          ? require('../../../assets/web/playbtn2L.svg')
                          : require('../../../assets/web/playbtn2D.svg'),
                    }}
                    style={[styles.pbtnImage, { width: 70, height: 70 }]}
                  />
                ) : (
                  <PlayBtn
                    style={styles.pbtnImage}
                    {...colors.lightPinkPlayBtn}
                  />
                )}
              </TouchableOpacity>
              <View style={styles.text}>
                <Text style={styles.mainText}>{explanation}</Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
                playSound(audio3);
              }}
              style={styles.bottomPlayBtn}
            >
              {Platform.OS === 'web' ? (
                <Image
                  source={{
                    uri:
                      name == 'dark'
                        ? require('../../../assets/web/playbtn2L.svg')
                        : require('../../../assets/web/playbtn2D.svg'),
                  }}
                  style={[{ width: 70, height: 70 }]}
                />
              ) : (
                <PlayBtn {...colors.purplePlayBtn} />
              )}
            </TouchableOpacity>
          </Animated.View>
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

const fadeIn = fadeAnim => {
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 150,
  }).start();
};

const fadeOut = fadeAnim => {
  // Will change fadeAnim value to 0 in 3 seconds
  Animated.timing(fadeAnim, {
    toValue: 0,
    duration: 150,
  }).start();
};
