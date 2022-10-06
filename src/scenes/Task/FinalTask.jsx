import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableOpacity,
  FlatList,
  Button,
  Image,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { Feather } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { createDndContext } from 'react-native-easy-dnd';
import PlayBtn from '../../../assets/images/PlayBtn';
import { Context } from '../../context/context';
import Background from '../../components/Background';
import { useSelector } from 'react-redux';
import Footer from '../../components/Footer';
import Accept from '../../../assets/images/Accept';
import CheckBtn from '../../../assets/images/CheckBtn';

const { Provider, Droppable, Draggable } = createDndContext();

export default function FinalTask({ navigation }) {
  const { tasks } = useSelector(state => state.tasks);
  const [sound, setSound] = useState();

  const droppableOpacity1 = React.useRef(new Animated.Value(0));
  const trashIconScale1 = React.useRef(new Animated.Value(1));
  const droppableOpacity2 = React.useRef(new Animated.Value(0));
  const trashIconScale2 = React.useRef(new Animated.Value(1));
  const [items, setItems] = React.useState(tasks);
  const [showFirstBtn, setShowFirstBtn] = useState(true);
  const [showSecondBtn, setShowSecondBtn] = useState(true);
  const animateValue = (ref, toValue) =>
    Animated.timing(ref.current, {
      toValue,
      duration: 300,
    }).start();
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
  const { colors } = useContext(Context);

  const styles = StyleSheet.create({
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
      // maxWidth: 370,
      maxWidth: 300,
    },
    heading: {
      // width: widthScreen,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 64,
      borderRadius: 99,
      padding: 10,
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
      width: 190,
      height: 190,
    },

    questionBtn: {
      marginTop: 102,
      alignSelf: 'center',
    },
    acceptBtn: {
      marginTop: 147,
      alignSelf: 'center',
    },
  });
  return (
    <Background>
      <Provider>
        <View>
          <Droppable
            onEnter={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              animateValue(trashIconScale1, 1.2);
            }}
            onLeave={() => {
              animateValue(trashIconScale1, 1);
            }}
            onDrop={({ payload }) => {
              animateValue(trashIconScale1, 1);
              animateValue(trashIconScale2, 1);
              if (payload === tasks[0].id) {
                setItems(items.filter(item => item.id !== payload));
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
                  ]}
                >
                  <TouchableOpacity
                    onPress={() => {
                      playSound(tasks[0].audio);
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
                      <PlayBtn
                        style={styles.pbtnImage}
                        {...colors.purplePlayBtn}
                      />
                    </Animated.View>
                  </TouchableOpacity>
                  <View style={styles.text}>
                    <Text style={styles.mainText}>{tasks[0].phrase}</Text>
                  </View>
                </Animated.View>
              );
            }}
          </Droppable>
          <Droppable
            onEnter={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              animateValue(trashIconScale2, 1.2);
            }}
            onLeave={() => {
              animateValue(trashIconScale2, 1);
            }}
            onDrop={({ payload }) => {
              animateValue(trashIconScale1, 1);
              animateValue(trashIconScale2, 1);
              if (payload === tasks[1].id) {
                setItems(items.filter(item => item.id !== payload));
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
                    { ...styles.heading, marginTop: 16 },
                  ]}
                >
                  <TouchableOpacity
                    onPress={() => {
                      playSound(tasks[0].audio);
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
                      <PlayBtn
                        style={styles.pbtnImage}
                        {...colors.purplePlayBtn}
                      />
                    </Animated.View>
                  </TouchableOpacity>
                  <View style={styles.text}>
                    <Text style={styles.mainText}>{tasks[1].phrase}</Text>
                  </View>
                </Animated.View>
              );
            }}
          </Droppable>
          {items.length === 0 ? (
            <TouchableOpacity
              style={styles.acceptBtn}
              onPress={() => {
                navigation.navigate('menu');
              }}
            >
              <CheckBtn style={styles.acceptBtn} {...colors.pinkPlayBtn} />
            </TouchableOpacity>
          ) : null}

          {items.length >= 2 ? (
            <Draggable
              key={items[1]?.id}
              onDragStart={() => {
                animateValue(droppableOpacity1, 1);
                setShowFirstBtn(false);
              }}
              onDragEnd={() => {
                animateValue(droppableOpacity1, 0);
                setShowFirstBtn(true);
              }}
              payload={items[1]?.id}
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
                        marginTop: 16,
                        alignSelf: 'flex-end',
                        alignItems: 'flex-end',
                      },
                    ]}
                  >
                    {showFirstBtn ? (
                      <TouchableOpacity
                        onPress={() => {
                          playSound(items[1]?.audio);
                        }}
                      >
                        <PlayBtn
                          style={styles.pbtnImage}
                          {...colors.pinkPlayBtn}
                        />
                      </TouchableOpacity>
                    ) : null}
                    <Image
                      style={{ ...styles.mainPicture, marginLeft: 12 }}
                      source={items[1]?.image}
                    />
                  </Animated.View>
                );
              }}
            </Draggable>
          ) : null}
          {items.length >= 1 ? (
            <Draggable
              key={items[0]?.id}
              onDragStart={() => {
                setShowSecondBtn(false);
                animateValue(droppableOpacity1, 1);
              }}
              onDragEnd={() => {
                setShowSecondBtn(true);
                animateValue(droppableOpacity1, 0);
              }}
              payload={items[0]?.id}
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
                        marginTop: 16,
                        alignItems: 'flex-end',
                      },
                    ]}
                  >
                    <Image
                      style={{ ...styles.mainPicture, marginRight: 12 }}
                      source={items[0]?.image}
                    />
                    {showSecondBtn ? (
                      <TouchableOpacity
                        onPress={() => {
                          playSound(items[0]?.audio);
                        }}
                      >
                        <PlayBtn
                          style={styles.pbtnImage}
                          {...colors.pinkPlayBtn}
                        />
                      </TouchableOpacity>
                    ) : null}
                  </Animated.View>
                );
              }}
            </Draggable>
          ) : null}
        </View>
      </Provider>
      <Footer navigation={navigation} />
    </Background>
  );
}
