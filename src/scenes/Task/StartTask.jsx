import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect, useContext, useRef } from 'react';
import Background from '../../components/Background';
import { Context } from '../../context/context';
import Footer from './../../components/Footer';
import PlayBtn from './../../components/icons/PlayBtn';
import TaskTitle from './../../components/icons/TaskTitle';
import * as Animatable from 'react-native-animatable';
import { Audio } from 'expo-av';
import { loadSound, loadSounds, playSound } from '../../services/sounds';

export default function StartTask({ navigation, route }) {
  const { name, colors } = useContext(Context);
  const [sound, setSound] = useState();
  const anim = useRef(null);
  const { title, isFinalTask, audio, duration } = route.params;

  useEffect(() => {
    async function fetch() {
      const loadedSound = await loadSounds([audio]);
      setSound(loadedSound[0]);
    }
    fetch();
  }, [audio]);
  const styles = StyleSheet.create({
    title: {
      flexDirection: 'row',
    },
    subTitle: {
      textAlign: 'center',
      alignSelf: 'center',
    },

    titleText: {
      fontFamily: 'Franklin Gothic Medium',
      fontStyle: 'italic',
      fontWeight: '400',
      fontSize: 32,
      textTransform: 'uppercase',
      color: colors.headingTextColor,
    },
    subText: {
      fontFamily: 'Franklin Gothic Medium',
      fontWeight: '400',
      fontStyle: 'italic',
      fontSize: 20,
      textTransform: 'uppercase',
      textAlign: 'left',
      color: colors.mainTextColor,
      maxWidth: 260,
      marginTop: 5,
    },
    heading: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 243,
    },
    playBtn: {
      marginLeft: 10,
      marginRight: 13,
      alignSelf: 'flex-end',
    },
  });
  return (
    <Background>
      <View>
        <View
          style={[
            styles.heading,
            Platform.OS == 'web' ? { marginTop: 200 } : {},
          ]}
        >
          <View>
            <View style={styles.title}>
              <TouchableOpacity
                onPress={() => {
                  playSound(sound);
                  setTimeout(() => {
                    if (!isFinalTask) {
                      navigation.navigate('taskquestion', {
                        taskIndex: 1,
                      });
                    } else {
                      navigation.navigate('finaltask');
                    }
                  }, duration);
                }}
              >
                <Animatable.Text
                  ref={anim}
                  animation='pulse'
                  easing='ease-out'
                  iterationCount='infinite'
                >
                  {Platform.OS === 'web' ? (
                    <Image
                      source={{
                        uri:
                          name == 'dark'
                            ? require('../../../assets/web/playbtn1L.svg')
                            : require('../../../assets/web/playbtn1D.svg'),
                      }}
                      style={[styles.playBtn, { width: 70, height: 70 }]}
                    />
                  ) : (
                    <PlayBtn style={styles.playBtn} {...colors.pinkPlayBtn} />
                  )}
                </Animatable.Text>
              </TouchableOpacity>
              <View style={styles.subTitle}>
                {Platform.OS === 'web' ? (
                  <Image
                    source={{
                      uri:
                        name == 'dark'
                          ? require('../../../assets/web/taskTitleL.svg')
                          : require('../../../assets/web/taskTitleD.svg'),
                    }}
                    style={[styles.titleText, { width: 179, height: 34 }]}
                  />
                ) : (
                  <TaskTitle style={styles.titleText} {...colors.qestionText} />
                )}
                <Text style={styles.subText}>{title}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <Footer
        leftBtnVisible={false}
        rightBtnVisible={false}
        navigation={navigation}
      />
    </Background>
  );
}
