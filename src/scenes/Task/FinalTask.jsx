import React, { useContext, useEffect, useState } from 'react';
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
import PlayBtn from '../../../assets/images/PlayBtn';
import { Context } from '../../context/context';
import Footer from '../../components/Footer';

export default FinalTask = ({ navigation }) => {
  const [showDraggable, setShowDraggable] = useState(true);
  const [showDraggable2, setShowDraggable2] = useState(true);
  const [dropZoneValues, setdropZoneValues] = useState(null);
  const [dropZoneValues2, setdropZoneValues2] = useState(null);
  const [pan, setPan] = useState(new Animated.ValueXY());
  const [pan2, setPan2] = useState(new Animated.ValueXY());

  const setDropZoneValues = event => {
    console.log(1, event.nativeEvent.layout);
    setdropZoneValues(event.nativeEvent.layout);
  };
  const setDropZoneValues2 = event => {
    console.log(2, event.nativeEvent.layout);
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
  });
  return (
    <Background>
      <View
        style={[styles.main, Platform.OS == 'web' ? { marginTop: -50 } : {}]}
      >
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
      <Footer
        navigation={navigation}
        rightBtnCallback={() => {
          navigation.navigate('starttask', {
            subTitle: 'ПОСЛУШАЙ И ЗАПОМНИ',
          });
        }}
      />
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
