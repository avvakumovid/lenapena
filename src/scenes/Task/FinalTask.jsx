import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  PanResponder,
  Animated,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Audio } from 'expo-av';
import { useSelector } from 'react-redux';
import Background from '../../components/Background';
import { Context } from '../../context/context';
import Footer from '../../components/Footer';
import XBtn from './../../components/icons/XBtn';
import CheckBtn from './../../components/icons/CheckBtn';
import PlayBtn from './../../components/icons/PlayBtn';

const FinalTask = ({ navigation }) => {
  const [showDraggable, setShowDraggable] = useState(true);
  const [showDraggable2, setShowDraggable2] = useState(true);
  const [dropZoneValues, setdropZoneValues] = useState(null);
  const [dropZoneValues2, setdropZoneValues2] = useState(null);
  const [showCheckBtn, setShowCheckBtn] = useState(false);
  const [showXBtn, setShowXBtn] = useState(false);
  const [pan, setPan] = useState(new Animated.ValueXY());
  const [pan2, setPan2] = useState(new Animated.ValueXY());

  useEffect(() => {
    if (!showDraggable && !showDraggable2) {
      setTimeout(() => {
        navigation.navigate(
          'starttask',
          {
            subTitle: 'ПОСЛУШАЙ И ЗАПОМНИ',
          },
          1000
        );
      });
    }
  }, [showDraggable, showDraggable2]);

  const setDropZoneValues = event => {
    setdropZoneValues(event.nativeEvent.layout);
  };
  const setDropZoneValues2 = event => {
    setdropZoneValues2(event.nativeEvent.layout);
  };
  const { tasks } = useSelector(state => state.tasks);
  const [sound, setSound] = useState();
  const trashIconScale1 = React.useRef(new Animated.Value(1));
  const trashIconScale2 = React.useRef(new Animated.Value(1));
  const checkBtn = useRef(new Animated.Value(0)).current;
  const xBtn = React.useRef(new Animated.Value(0)).current;
  const [items, setItems] = React.useState(tasks);
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
  const { name, colors } = useContext(Context);

  const styles = StyleSheet.create({
    pbtnImage: {},
    main: {
      justifyContent: 'space-between',
      marginTop: 55,
      paddingLeft: 10,
    },
    mainText: {
      fontFamily: 'Franklin Gothic Medium',
      fontStyle: 'italic',
      fontWeight: '400',
      fontSize: 32,
      textTransform: 'uppercase',
      color: colors.mainTextColor,
      marginLeft: 15,
      maxWidth: 300,
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
    checkBtn: {
      position: 'absolute',
      top: '20%',
    },
  });
  return (
    <Background>
      <View style={[styles.main, Platform.OS == 'web' ? {} : {}]}>
        <Animated.View
          onLayout={setDropZoneValues.bind(this)}
          style={[styles.heading]}
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
                  {...colors.lightPinkPlayBtn}
                />
              )}
            </Animated.View>
          </TouchableOpacity>
          <View style={styles.text}>
            <Text style={styles.mainText}>{tasks[0].phrase}</Text>
          </View>
        </Animated.View>
        <Animated.View
          onLayout={setDropZoneValues2.bind(this)}
          style={[styles.heading, { marginBottom: 45 }]}
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
                <PlayBtn style={styles.pbtnImage} {...colors.pinkPlayBtn} />
              )}
            </Animated.View>
          </TouchableOpacity>
          <View style={styles.text}>
            <Text style={styles.mainText}>{tasks[1].phrase}</Text>
          </View>
        </Animated.View>
        {showDraggable && (
          <RenderDraggable
            pan={pan}
            panResponder={creatPanResponder(
              pan,
              dropZoneValues,
              setShowDraggable,
              checkBtn,
              xBtn,
              setShowCheckBtn,
              setShowXBtn
            )}
            item={items[0]}
          />
        )}
        {showDraggable2 && (
          <RenderDraggable
            pan={pan2}
            panResponder={creatPanResponder(
              pan2,
              dropZoneValues2,
              setShowDraggable2,
              checkBtn,
              xBtn,
              setShowCheckBtn,
              setShowXBtn
            )}
            item={items[1]}
          />
        )}
      </View>
      <Footer
        navigation={navigation}
        rightBtnCallback={() => {
          navigation.navigate('starttask', {
            subTitle: 'ПОСЛУШАЙ И ЗАПОМНИ',
          });
        }}
        leftBtnVisible={false}
        rightBtnVisible={false}
      />
      {showCheckBtn && (
        <Animated.View style={[styles.checkBtn, { opacity: checkBtn }]}>
          <CheckBtn {...colors.lightPinkPlayBtn} />
        </Animated.View>
      )}
      {showXBtn && (
        <Animated.View style={[styles.checkBtn, { opacity: xBtn }]}>
          <XBtn {...colors.lightPinkPlayBtn} />
        </Animated.View>
      )}
    </Background>
  );
};

const RenderDraggable = ({ pan, panResponder, item }) => {
  const { name, colors } = useContext(Context);
  const styles = StyleSheet.create({
    pbtnImage: {},
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
  });
  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        pan.getLayout(),
        {
          ...styles.heading,
          alignItems: 'flex-end',
        },
      ]}
    >
      <Image
        style={{ ...styles.mainPicture, marginRight: 12 }}
        source={item.image}
      />
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
            style={[styles.pbtnImage, { width: 70, height: 70 }]}
          />
        ) : (
          <PlayBtn style={styles.pbtnImage} {...colors.pinkPlayBtn} />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const isDropZone = (gesture, dropZoneValues) => {
  return (
    gesture.moveY / 2 > dropZoneValues.y &&
    gesture.moveY / 2 < dropZoneValues.y + dropZoneValues.height
  );
};

const creatPanResponder = (
  pan,
  dropZoneValues,
  setShowDraggable,
  fadeC,
  fadeX,
  setC,
  setX
) => {
  return PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event([
      null,
      {
        dx: pan.x,
        dy: pan.y,
      },
    ]),
    onPanResponderRelease: (e, gesture) => {
      if (isDropZone(gesture, dropZoneValues)) {
        setShowDraggable(false);
        setC(true);
        fadeIn(fadeC);

        setTimeout(() => {
          fadeOut(fadeC);
          setC(false);
        }, 1000);
      } else {
        setX(true);
        fadeIn(fadeX);
        Animated.spring(pan, { toValue: { x: 0, y: 0 } }).start();
        setTimeout(() => {
          fadeOut(fadeX);
          setX(false);
        }, 1000);
      }
    },
  });
};

const fadeIn = fadeAnim => {
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 350,
  }).start();
};

const fadeOut = fadeAnim => {
  // Will change fadeAnim value to 0 in 3 seconds
  Animated.timing(fadeAnim, {
    toValue: 0,
    duration: 350,
  }).start();
};

export default FinalTask;
