import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  Image,
  Platform,
  Dimensions,
} from 'react-native';
import { Audio } from 'expo-av';
import { createDndContext } from 'react-native-easy-dnd';
import { Context } from '../../context/context';
import Background from '../../components/Background';
import { useSelector, useDispatch } from 'react-redux';
import Footer from '../../components/Footer';
import PlayBtn from './../../components/icons/PlayBtn';
import Modal from '../../components/Modal/Modal';
import { setNewTask, setTasks } from '../../store/slice/tasksSlice';
import { loadSounds, playSound } from '../../services/sounds';
import AudioBtn from './../../components/AudioBtn/AudioBtn';
import useAudio from './../../hooks/useAudio';

const { Provider, Droppable, Draggable } = createDndContext();

const FinalTaskWeb = ({ navigation }) => {
  const { tasks } = useSelector(state => state.tasks);
  // const [tasksSounds, setTasksSounds] = useState();
  // const [itemsSounds, setItemsSounds] = useState();
  const droppableOpacity1 = React.useRef(new Animated.Value(0));
  const trashIconScale1 = React.useRef(new Animated.Value(0));
  const trashIconScale2 = React.useRef(new Animated.Value(0));
  const [items, setItems] = React.useState(shuffle(tasks));
  const [showFirstBtn, setShowFirstBtn] = useState(true);
  const [btnNumber, setBtnNumber] = useState(1);

  const [success, setSuccess] = useState(
    require('../../../assets/sounds/success.mp3')
  );
  const [mistake, setMistake] = useState(
    require('../../../assets/sounds/mistake.mp3')
  );

  const playSuccess = useAudio(success).playSound;
  const playError = useAudio(mistake).playSound;

  const [modalVisible, setModalVisible] = useState(false);
  const [isRight, setIsRight] = useState(false);

  const dispatch = useDispatch();

  const animateValue = (ref, toValue) =>
    Animated.timing(ref.current, {
      toValue,
      duration: 350,
    }).start();

  useEffect(() => {
    if (items.length == 0) {
      dispatch(setTasks());
      setTimeout(() => {
        navigation.navigate('starttask', {
          title: '???????????????? ?? ??????????????',
          isFinalTask: false,
          audio: require('../../../assets/sounds/???????????????? ?? ??????????????.mp3'),
          duration: 2000,
        });
      }, 1000);
    }
  }, [items]);
  const { name, colors } = useContext(Context);
  const widthScreen = Dimensions.get('screen').width;
  const styles = StyleSheet.create({
    pbtnImage: {},
    mainText: {
      fontFamily: 'Franklin Gothic Medium',
      fontStyle: 'italic',
      fontWeight: '400',
      fontSize: 26,
      textTransform: 'uppercase',
      color: colors.mainTextColor,
      marginLeft: 15,
      width: widthScreen - 140,
      maxWidth: 700,
    },
    heading: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 18,
      borderRadius: 99,
    },
    dropWrapper: {
      width: '100%',
      height: '30%',
      flexDirection: 'row',
      alignItems: 'center',
      position: 'absolute',
      borderRadius: 30,
    },
    drop: {
      position: 'relative',
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      borderRadius: 99,
      marginTop: 72,
    },
    mainPicture: {
      alignSelf: 'center',
      width: 170,
      height: 170,
    },
    main: {
      marginTop: -40,
      height: '100%',
      justifyContent: 'space-between',
      overflow: 'hidden',
      touchAction: 'none',
    },
  });
  return (
    <Background>
      <Provider>
        <View
          style={[
            styles.main,
            Platform.OS == 'web'
              ? {
                  maxWidth: 600,
                }
              : {
                  marginTop: 20,
                  height: '90%',
                },
          ]}
        >
          <Droppable
            customId={1}
            onEnter={({ payload }) => {
              animateValue(trashIconScale1, 0.2);
            }}
            onLeave={() => {
              animateValue(trashIconScale1, 0);
            }}
            onDrop={({ payload }) => {
              animateValue(trashIconScale1, 0);
              animateValue(trashIconScale2, 0);
              if (payload === tasks[0].id) {
                let t = items.filter(item => item.id !== payload);
                setItems(t);
                setIsRight(true);
                playSuccess();
                setModalVisible(true);
                setTimeout(() => {
                  setModalVisible(false);
                }, 400);
              } else {
                setIsRight(false);
                playError();
                setModalVisible(true);
                setTimeout(() => {
                  setModalVisible(false);
                }, 400);
              }
            }}
          >
            {({ active, viewProps }) => {
              return (
                <>
                  <Animated.View
                    {...viewProps}
                    style={[
                      viewProps.style,
                      styles.dropWrapper,
                      {
                        backgroundColor: colors.mainTextColor,
                        opacity: trashIconScale1.current,
                        marginTop: 68,
                        transform: [
                          {
                            opacity: trashIconScale1.current,
                          },
                        ],
                      },
                    ]}
                  ></Animated.View>
                  <Animated.View style={[viewProps.style, styles.drop]}>
                    <AudioBtn
                      onPress={() => {
                        if (btnNumber == 1) {
                          setBtnNumber(2);
                        }
                      }}
                      audio={tasks[0].audio1}
                      // disabled={!(btnNumber >= 1)}
                      animation={btnNumber == 1 && 'pulse'}
                      theme={name}
                      number={1}
                      colors={colors}
                    />
                    <View style={styles.text}>
                      <Text style={styles.mainText}>{tasks[0].phrase}</Text>
                    </View>
                  </Animated.View>
                </>
              );
            }}
          </Droppable>
          <View style={{}}>
            {items.map((item, index) => {
              return (
                <Draggable
                  key={item.id}
                  onDragStart={() => {
                    animateValue(droppableOpacity1, 1);
                    setShowFirstBtn(false);
                  }}
                  onDragEnd={() => {
                    animateValue(droppableOpacity1, 0);
                    setShowFirstBtn(true);
                  }}
                  payload={item.id}
                >
                  {({ viewProps }) => {
                    return (
                      <Animated.View
                        useNativeDriver={false}
                        {...viewProps}
                        style={[
                          viewProps.style,
                          {
                            ...styles.heading,
                            alignItems: 'flex-end',
                            marginTop: 72,
                            borderRadius: 0,
                          },
                          Platform.OS == 'web' ? { marginTop: 22 } : {},
                        ]}
                      >
                        <Image
                          style={{ ...styles.mainPicture, marginRight: 12 }}
                          source={item.image}
                        />
                        {showFirstBtn ? (
                          <AudioBtn
                            onPress={() => {
                              if (btnNumber == 2 + index) {
                                setBtnNumber(3 + index);
                              }
                            }}
                            audio={items[index].audio2}
                            // disabled={!(btnNumber >= 2 + index)}
                            animation={btnNumber == 2 + index && 'pulse'}
                            theme={name}
                            number={2 - index}
                            colors={colors}
                          />
                        ) : null}
                      </Animated.View>
                    );
                  }}
                </Draggable>
              );
            })}
          </View>
          <Droppable
            onEnter={({ payload }) => {
              animateValue(trashIconScale2, 0.2);
            }}
            onLeave={() => {
              animateValue(trashIconScale2, 0);
            }}
            onDrop={({ payload }) => {
              animateValue(trashIconScale1, 0);
              animateValue(trashIconScale2, 0);
              if (payload === tasks[1].id) {
                let t = items.filter(item => item.id !== payload);
                setItems(t);
                setIsRight(true);
                setModalVisible(true);
                playSuccess();
                setTimeout(() => {
                  setModalVisible(false);
                }, 400);
              } else {
                setIsRight(false);
                setModalVisible(true);
                playError();
                setTimeout(() => {
                  setModalVisible(false);
                }, 400);
              }
            }}
            customId={2}
          >
            {({ active, viewProps }) => {
              return (
                <>
                  <Animated.View
                    {...viewProps}
                    style={[
                      viewProps.style,
                      styles.dropWrapper,
                      { bottom: 0 },
                      {
                        backgroundColor: colors.mainTextColor,
                        opacity: trashIconScale2.current,
                        transform: [
                          {
                            opacity: trashIconScale2.current,
                          },
                        ],
                      },
                    ]}
                  ></Animated.View>
                  <Animated.View style={[viewProps.style, styles.drop]}>
                    <AudioBtn
                      onPress={() => {
                        if (btnNumber == 4) {
                          setBtnNumber(5);
                        }
                      }}
                      audio={tasks[1].audio1}
                      // disabled={!(btnNumber >= 4)}
                      animation={btnNumber == 4 && 'pulse'}
                      theme={name}
                      number={2}
                      colors={colors}
                    />

                    <View style={styles.text}>
                      <Text style={styles.mainText}>{tasks[1].phrase}</Text>
                    </View>
                  </Animated.View>
                </>
              );
            }}
          </Droppable>
        </View>
      </Provider>
      {/* <Footer
        navigation={navigation}
        leftBtnVisible={false}
        rightBtnVisible={false}
      /> */}
      <Modal isRight={isRight} modalVisible={modalVisible} />
    </Background>
  );
};

export default FinalTaskWeb;

function shuffle(array) {
  let shuffleArr = [...array];
  shuffleArr.sort(() => Math.random() - 0.5);
  return shuffleArr;
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  console.log(
    `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(
      result[3],
      16
    )}`
  );
  return result
    ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(
        result[3],
        16
      )}`
    : null;
}
