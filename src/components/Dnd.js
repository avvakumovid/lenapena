import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  PanResponder,
  Animated,
  Easing,
  Platform,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import Background from './Background';
import { Audio } from 'expo-av';
import { useSelector } from 'react-redux';
import PlayBtn from '../../assets/images/PlayBtn';
import { Context } from '../context/context';

let CIRCLE_RADIUS = 36;
let Window = Dimensions.get('window');
let styles = StyleSheet.create({
  dropZone: {
    height: 100,
    backgroundColor: '#2c3e50',
  },
  text: {
    marginTop: 25,
    marginLeft: 5,
    marginRight: 5,
    textAlign: 'center',
    color: '#fff',
  },
  draggableContainer: {
    // position: 'absolute',
    // top: Window.height / 2 - CIRCLE_RADIUS,
    // left: Window.width / 2 - CIRCLE_RADIUS,
  },
  circle: {
    backgroundColor: '#1abc9c',
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
  },
});

export default Dnd = () => {
  const [showDraggable, setShowDraggable] = useState(true);
  const [showDraggable2, setShowDraggable2] = useState(true);
  const [dropZoneValues, setdropZoneValues] = useState(null);
  const [dropZoneValues2, setdropZoneValues2] = useState(null);
  const [pan, setPan] = useState(new Animated.ValueXY());
  const [pan2, setPan2] = useState(new Animated.ValueXY());

  const panResponder = PanResponder.create({
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
      } else {
        Animated.spring(pan, { toValue: { x: 0, y: 0 } }).start();
      }
    },
  });
  const setDropZoneValues = event => {
    setdropZoneValues(event.nativeEvent.layout);
  };
  const setDropZoneValues2 = event => {
    setdropZoneValues2(event.nativeEvent.layout);
  };
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
  const { name, colors } = useContext(Context);

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
      marginTop: 18,
      borderRadius: 99,

      // marginBottom: 34,
    },
    bottomPlayBtn: {
      alignSelf: 'center',
      marginTop: 32,
    },
    mainPicture: {
      alignSelf: 'center',
      // marginBottom: 51,
      // marginTop: 32,
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
      <View style={Platform.OS == 'web' ? { marginTop: -50 } : {}}>
        <Animated.View
          onLayout={setDropZoneValues.bind(this)}
          style={[styles.heading, { marginTop: 72 }]}
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
                        ? require('../../assets/web/playbtn1L.png')
                        : require('../../assets/web/playbtn1D.png'),
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
          style={[styles.heading]}
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
                        ? require('../../assets/web/playbtn1L.png')
                        : require('../../assets/web/playbtn1D.png'),
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
              setShowDraggable
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
              setShowDraggable2
            )}
            item={items[1]}
          />
        )}
      </View>
    </Background>
  );
};

const RenderDraggable = ({ pan, panResponder, item }) => {
  const { name, colors } = useContext(Context);
  const styles = StyleSheet.create({
    pbtnImage: {},
    heading: {
      // width: widthScreen,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 18,
      borderRadius: 99,

      // marginBottom: 34,
    },

    mainPicture: {
      alignSelf: 'center',
      // marginBottom: 51,
      // marginTop: 32,
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
                  ? require('../../assets/web/playbtn1L.png')
                  : require('../../assets/web/playbtn1D.png'),
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
    gesture.moveY > dropZoneValues.y &&
    gesture.moveY < dropZoneValues.y + dropZoneValues.height
  );
};

const creatPanResponder = (pan, dropZoneValues, setShowDraggable) => {
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
      } else {
        Animated.spring(pan, { toValue: { x: 0, y: 0 } }).start();
      }
    },
  });
};
