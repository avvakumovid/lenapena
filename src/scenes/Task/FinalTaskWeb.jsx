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
import { useSelector } from 'react-redux';
import Footer from '../../components/Footer';
import PlayBtn from './../../components/icons/PlayBtn';
import Modal from '../../components/Modal/Modal';

const { Provider, Droppable, Draggable } = createDndContext();

const FinalTaskWeb = ({ navigation }) => {
  const { tasks } = useSelector(state => state.tasks);
  const [sound, setSound] = useState();

  const droppableOpacity1 = React.useRef(new Animated.Value(0));
  const trashIconScale1 = React.useRef(new Animated.Value(1));
  const trashIconScale2 = React.useRef(new Animated.Value(1));
  const [items, setItems] = React.useState(shuffle(tasks));
  const [showFirstBtn, setShowFirstBtn] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [isRight, setIsRight] = useState(false);

  const animateValue = (ref, toValue) =>
    Animated.timing(ref.current, {
      toValue,
      duration: 350,
    }).start();
  async function playSound(audio) {
    const { sound } = await Audio.Sound.createAsync(audio);
    setSound(sound);

    await sound.playAsync();
  }
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  useEffect(() => {
    if (items.length == 0) {
      setTimeout(() => {
        navigation.navigate('starttask', {
          subTitle: 'ПОСЛУШАЙ И ЗАПОМНИ',
          taskNumber: 1,
        });
      }, 400);
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
      fontSize: 32,
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
      width: 190,
      height: 190,
    },
    main: {
      marginTop: -50,
      height: '95%',
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
              ? {}
              : {
                  marginTop: 20,
                  height: '90%',
                },
          ]}
        >
          <Droppable
            customId={1}
            onEnter={({ payload }) => {
              animateValue(trashIconScale1, 1.2);
            }}
            onLeave={() => {
              animateValue(trashIconScale1, 1);
            }}
            onDrop={({ payload }) => {
              animateValue(trashIconScale1, 1);
              animateValue(trashIconScale2, 1);
              if (payload === tasks[0].id) {
                let t = items.filter(item => item.id !== payload);
                setItems(t);
                setIsRight(true);
                setModalVisible(true);
                setTimeout(() => {
                  setModalVisible(false);
                }, 400);
              } else {
                setIsRight(false);
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
                    style={[viewProps.style, styles.dropWrapper]}
                  ></Animated.View>
                  <Animated.View style={[viewProps.style, styles.drop]}>
                    <TouchableOpacity
                      onPress={() => {
                        playSound(tasks[0].audio1);
                      }}
                    >
                      <Animated.View
                        style={[
                          {
                            transform: [
                              {
                                scale: trashIconScale1.current,
                              },
                            ],
                          },
                        ]}
                      >
                        {Platform.OS === 'web' ? (
                          <Image
                            source={{
                              uri:
                                name == 'dark'
                                  ? require('../../../assets/web/playbtn1L.svg')
                                  : require('../../../assets/web/playbtn1D.svg'),
                            }}
                            style={[
                              styles.pbtnImage,
                              { width: 70, height: 70 },
                            ]}
                          />
                        ) : (
                          <PlayBtn
                            style={styles.pbtnImage}
                            {...colors.pinkPlayBtn}
                          />
                        )}
                      </Animated.View>
                    </TouchableOpacity>
                    <View style={styles.text}>
                      <Text style={styles.mainText}>{tasks[0].phrase}</Text>
                    </View>
                  </Animated.View>
                </>
              );
            }}
          </Droppable>
          <View style={{ marginTop: -50 }}>
            {items.map(item => {
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
                          <TouchableOpacity
                            onPress={() => {
                              playSound(item.audio1);
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
                                style={[
                                  styles.pbtnImage,
                                  { width: 70, height: 70 },
                                ]}
                              />
                            ) : (
                              <PlayBtn
                                style={styles.pbtnImage}
                                {...colors.pinkPlayBtn}
                              />
                            )}
                          </TouchableOpacity>
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
              animateValue(trashIconScale2, 1.2);
            }}
            onLeave={() => {
              animateValue(trashIconScale2, 1);
            }}
            onDrop={({ payload }) => {
              animateValue(trashIconScale1, 1);
              animateValue(trashIconScale2, 1);
              if (payload === tasks[1].id) {
                let t = items.filter(item => item.id !== payload);
                setItems(t);
                setIsRight(true);
                setModalVisible(true);
                setTimeout(() => {
                  setModalVisible(false);
                }, 400);
              } else {
                setIsRight(false);
                setModalVisible(true);
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
                    style={[viewProps.style, styles.dropWrapper, { bottom: 0 }]}
                  ></Animated.View>
                  <Animated.View
                    style={[
                      {
                        backgroundColor: active
                          ? 'rgba(112, 78, 244, 0)'
                          : 'rgba(112, 78, 244, 0)',
                      },
                      viewProps.style,
                      { ...styles.heading },
                    ]}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        playSound(tasks[1].audio1);
                      }}
                    >
                      <Animated.View
                        style={[
                          {
                            transform: [
                              {
                                scale: trashIconScale2.current,
                              },
                            ],
                          },
                        ]}
                      >
                        {Platform.OS === 'web' ? (
                          <Image
                            source={{
                              uri:
                                name == 'dark'
                                  ? require('../../../assets/web/playbtn1L.svg')
                                  : require('../../../assets/web/playbtn1D.svg'),
                            }}
                            style={[
                              styles.pbtnImage,
                              { width: 70, height: 70 },
                            ]}
                          />
                        ) : (
                          <PlayBtn
                            style={styles.pbtnImage}
                            {...colors.pinkPlayBtn}
                          />
                        )}
                      </Animated.View>
                    </TouchableOpacity>
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
      <Footer
        navigation={navigation}
        leftBtnVisible={false}
        rightBtnVisible={false}
      />
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
