import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions,
} from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { Audio } from 'expo-av';
import Background from '../../components/Background';
import Footer from '../../components/Footer';
import { Context } from '../../context/context';
import PlayBtn from '../../../assets/images/PlayBtn';
import QestionBtn from './../../../assets/images/QestionBtn';
import { useSelector, useDispatch } from 'react-redux';
import { acceptTask } from '../../store/slice/tasksSlice';

const widthScreen = Dimensions.get('screen').width;

export default function TaskQuestion({ navigation, route }) {
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
    container: {},
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
      maxWidth: widthScreen - 135,
    },

    heading: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 100,
      width: widthScreen - 55,
      paddingHorizontal: 20,
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
                      ? require('../../../assets/web/playbtn1L.png')
                      : require('../../../assets/web/playbtn1D.png'),
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
          <TouchableOpacity
            onPress={() => {
              setPressQestion(prev => !prev);
            }}
          >
            {Platform.OS === 'web' ? (
              <Image
                source={{
                  uri:
                    name == 'dark'
                      ? require('../../../assets/web/qestionbtnL.png')
                      : require('../../../assets/web/qestionbtnD.png'),
                }}
                style={[styles.questionBtn, { width: 190, height: 190 }]}
              />
            ) : (
              <QestionBtn style={styles.questionBtn} {...colors.qestionBtn} />
            )}
          </TouchableOpacity>
        ) : (
          <>
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
                          ? require('../../../assets/web/playbtn2L.png')
                          : require('../../../assets/web/playbtn2D.png'),
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
                        ? require('../../../assets/web/playbtn2L.png')
                        : require('../../../assets/web/playbtn2D.png'),
                  }}
                  style={[{ width: 70, height: 70 }]}
                />
              ) : (
                <PlayBtn {...colors.purplePlayBtn} />
              )}
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
