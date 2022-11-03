import {
  View,
  Text,
  StyleSheet,
  Image,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import Background from '../../components/Background';
import { Context } from '../../context/context';
import { useDispatch, useSelector } from 'react-redux';
import { acceptTask, setTasks } from '../../store/slice/tasksSlice';
import Footer from './../../components/Footer';
import PlayBtn from './../../components/icons/PlayBtn';
import TaskTitle1 from './../../components/icons/TaskTitle1';
import TaskTitle2 from './../../components/icons/TaskTitle2';
import TaskTitle3 from './../../components/icons/TaskTitle3';

export default function StartTask({ navigation, route }) {
  const dispatch = useDispatch();

  const [taskNumber, setTaskNumber] = useState(1);
  const [taskTitleL, setTaskTitle] = useState(null);

  const { tasks } = useSelector(state => state.tasks);
  const { name, colors } = useContext(Context);
  let params = route.params;
  console.log(params);
  useEffect(() => {
    if (params.taskIndex !== undefined) {
      if (params.taskIndex != -1) {
        dispatch(acceptTask(params.taskIndex));
      }
    } else {
      dispatch(setTasks());
    }
    setTaskNumber(params.taskNumber);
  }, [params]);
  useEffect(() => {
    if (name == 'dark') {
      if (taskNumber == 1) {
        setTaskTitle(require('../../../assets/web/taskTitle1L.svg'));
      } else if (taskNumber == 2) {
        setTaskTitle(require('../../../assets/web/taskTitle2L.svg'));
      } else {
        setTaskTitle(require('../../../assets/web/taskTitle3L.svg'));
      }
    } else {
      if (taskNumber == 1) {
        setTaskTitle(require('../../../assets/web/taskTitle1D.svg'));
      } else if (taskNumber == 2) {
        setTaskTitle(require('../../../assets/web/taskTitle2D.svg'));
      } else {
        setTaskTitle(require('../../../assets/web/taskTitle3D.svg'));
      }
    }
  }, [taskNumber]);

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
                      taskNumber: taskNumber + 1,
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
                          ? require('../../../assets/web/playbtn1L.svg')
                          : require('../../../assets/web/playbtn1D.svg'),
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
                      uri: taskTitleL,
                    }}
                    style={[styles.titleText, { width: 220, height: 34 }]}
                  />
                ) : taskNumber === 1 ? (
                  <TaskTitle1
                    style={styles.titleText}
                    {...colors.qestionText}
                  />
                ) : taskNumber == 2 ? (
                  <TaskTitle2
                    style={styles.titleText}
                    {...colors.qestionText}
                  />
                ) : (
                  <TaskTitle3
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
      />
    </Background>
  );
}
