import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { Audio } from 'expo-av';
import Background from '../../components/Background';
import { Context } from '../../context/context';
import { useDispatch, useSelector } from 'react-redux';
import { acceptTask, setTasks } from '../../store/slice/tasksSlice';
import Footer from './../../components/Footer';
import QestionText from './../../components/icons/QestionText';
import PlayBtn from './../../components/icons/PlayBtn';

const widthScreen = Dimensions.get('screen').width;

export default function StartTask({ navigation, route }) {
  const dispatch = useDispatch();

  const { tasks } = useSelector(state => state.tasks);
  const { name, colors } = useContext(Context);
  console.log(name);
  let params = route.params;
  useEffect(() => {
    if (params.taskIndex !== undefined) {
      if (params.taskIndex != -1) {
        dispatch(acceptTask(params.taskIndex));
      }
    } else {
      dispatch(setTasks());
    }
  }, [params]);
  useEffect(() => {}, [tasks]);
  const [sound, setSound] = useState();
  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('../../../assets/sounds/keepYourWord.mp3')
    );
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
                  const remainTaskIndex = tasks.findIndex(
                    task => task.isAccepted === false
                  );
                  if (remainTaskIndex != -1) {
                    navigation.navigate('taskquestion', {
                      taskIndex: remainTaskIndex,
                    });
                  } else {
                    navigation.navigate('finaltask');
                  }
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
                    style={[styles.playBtn, { width: 70, height: 70 }]}
                  />
                ) : (
                  <PlayBtn style={styles.playBtn} {...colors.pinkPlayBtn} />
                )}
              </TouchableOpacity>

              <View style={styles.subTitle}>
                {Platform.OS === 'web' ? (
                  <Image
                    source={{
                      uri:
                        name == 'dark'
                          ? require('../../../assets/web/taskTitleL.png')
                          : require('../../../assets/web/taskTitleD.png'),
                    }}
                    style={[styles.titleText, { width: 181, height: 34 }]}
                  />
                ) : (
                  <QestionText
                    style={styles.titleText}
                    {...colors.qestionText}
                  />
                )}
                <Text style={styles.subText}>{params.subTitle}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      <Footer
        leftBtnVisible={false}
        rightBtnVisible={false}
        navigation={navigation}
        rightBtnCallback={() => {
          const subTitle =
            taskIndex == tasks.length - 1
              ? 'ПОСЛУШАЙ И соедени картинки правильно'
              : 'ПОСЛУШАЙ И ЗАПОМНИ';
          navigation.navigate('starttask', {
            taskIndex,
            subTitle,
            W,
          });
        }}
      />
    </Background>
  );
}
