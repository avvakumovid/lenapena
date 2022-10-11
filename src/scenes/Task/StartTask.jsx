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
import PlayBtn from '../../../assets/images/PlayBtn';
import { useDispatch, useSelector } from 'react-redux';
import { acceptTask, setTasks } from '../../store/slice/tasksSlice';
import HomeBtn from '../../../assets/images/HomeBtn';
import { LinearGradient } from 'expo-linear-gradient';
import QestionText from '../../../assets/images/QestionText';

const widthScreen = Dimensions.get('screen').width;

export default function StartTask({ navigation, route }) {
  const dispatch = useDispatch();

  const { tasks } = useSelector(state => state.tasks);
  const { colors } = useContext(Context);
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
  useEffect(() => {
    console.log(tasks);
    console.log(
      'isAccepted',
      tasks.findIndex(task => task.isAccepted === false)
    );
  }, [tasks]);
  const [sound, setSound] = useState();
  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
      require('../../../assets/sounds/keepYourWord.mp3')
    );
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
    title: {
      flexDirection: 'row',
      width: widthScreen - widthScreen * 0.2,
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
      // alignSelf: 'flex-end',
      textAlign: 'right',
      color: colors.mainTextColor,
      maxWidth: 260,
    },
    heading: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: '55%',
    },
    playBtn: {
      marginRight: 13,
      alignSelf: 'flex-end',
    },
  });
  return (
    <Background>
      <View style={styles.heading}>
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
              <PlayBtn style={styles.playBtn} {...colors.pinkPlayBtn} />
            </TouchableOpacity>

            <View style={styles.subTitle}>
              <QestionText style={styles.titleText} {...colors.qestionText} />
              <Text style={styles.subText}>{params.subTitle}</Text>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('menu');
        }}
      >
        {/* <Image
          style={styles.goHome}
          source={require("../../../assets/images/goHomeAlt.png")}
        /> */}
        <HomeBtn style={styles.goHome} {...colors.footerMiddleBtn} />
      </TouchableOpacity>
    </Background>
  );
}
