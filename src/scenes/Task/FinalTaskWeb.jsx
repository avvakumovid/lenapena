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

const { Provider, Droppable, Draggable } = createDndContext();

const FinalTaskWeb = ({ navigation }) => {
  const { tasks } = useSelector(state => state.tasks);
  const [sound, setSound] = useState();

  const droppableOpacity1 = React.useRef(new Animated.Value(0));
  const trashIconScale1 = React.useRef(new Animated.Value(1));
  const trashIconScale2 = React.useRef(new Animated.Value(1));
  const [items, setItems] = React.useState(shuffle(tasks));
  const [showFirstBtn, setShowFirstBtn] = useState(true);

  const animateValue = (ref, toValue) =>
    Animated.timing(ref.current, {
      toValue,
      duration: 300,
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
      navigation.navigate('starttask', {
        subTitle: 'ПОСЛУШАЙ И ЗАПОМНИ',
      });
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

    mainPicture: {
      alignSelf: 'center',
      width: 190,
      height: 190,
    },
    main: {
      marginTop: -50,
      height: '90%',
      justifyContent: 'space-between',
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
              console.log('tasks', tasks);
              console.log('payload', payload);
              if (payload === tasks[0].id) {
                animateValue(trashIconScale1, 1.2);
              }
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
              }
            }}
          >
            {({ active, viewProps }) => {
              return (
                <Animated.View
                  {...viewProps}
                  style={[
                    {
                      backgroundColor: active
                        ? 'rgba(112, 78, 244, 0)'
                        : 'rgba(112, 78, 244, 0)',
                    },
                    viewProps.style,
                    styles.heading,
                    { marginTop: 72 },
                  ]}
                >
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
                                ? require('../../../assets/web/playbtn1L.png')
                                : require('../../../assets/web/playbtn1D.png'),
                          }}
                          style={[styles.pbtnImage, { width: 70, height: 70 }]}
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
                                      ? require('../../../assets/web/playbtn1L.png')
                                      : require('../../../assets/web/playbtn1D.png'),
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
              console.log('tasks', tasks);
              console.log('payload', payload);
              if (payload === tasks[1].id) {
                animateValue(trashIconScale2, 1.2);
              }
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
              }
            }}
            customId={2}
          >
            {({ active, viewProps }) => {
              return (
                <Animated.View
                  {...viewProps}
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
                      playSound(tasks[0].audio2);
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
                                ? require('../../../assets/web/playbtn1L.png')
                                : require('../../../assets/web/playbtn1D.png'),
                          }}
                          style={[styles.pbtnImage, { width: 70, height: 70 }]}
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
    </Background>
  );
};

export default FinalTaskWeb;

function shuffle(array) {
  let shuffleArr = [...array];
  shuffleArr.sort(() => Math.random() - 0.5);
  return shuffleArr;
}
