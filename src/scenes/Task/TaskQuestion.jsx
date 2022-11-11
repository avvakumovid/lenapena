import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions,
  Animated,
} from 'react-native';
import React, { useState, useEffect, useContext, useRef } from 'react';
import Background from '../../components/Background';
import Footer from '../../components/Footer';
import { Context } from '../../context/context';
import { useSelector } from 'react-redux';
import QestionBtn from './../../components/icons/QestionBtn';
import PlayBtn from './../../components/icons/PlayBtn';
import * as Animatable from 'react-native-animatable';
import { loadSounds, playSound } from '../../services/sounds';
import AudioBtn from '../../components/AudioBtn/AudioBtn';
import Title from '../../components/Title/Title';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

const widthScreen = Dimensions.get('screen').width;

export default function TaskQuestion({ navigation, route }) {
  const fadeBtnAnim = useRef(new Animated.Value(1)).current;
  const fadeMainAnim = useRef(new Animated.Value(0)).current;
  const [sounds, setSound] = useState();
  const [btnNumber, setBtnNumber] = useState(1);
  const [pressQestion, setPressQestion] = useState(false);
  const { tasks } = useSelector(state => state.tasks);
  let { taskIndex } = route.params;

  let { phrase, explanation, image, audio1, audio2, audio3, isAccepted } =
    tasks[taskIndex - 1];
  const { name, colors } = useContext(Context);

  useEffect(() => {
    async function fetch() {
      const loadedSounds = await loadSounds([audio1, audio2, audio3]);
      setSound(loadedSounds);
    }
    fetch();
  }, [audio1, audio2, audio3]);

  const styles = StyleSheet.create({
    container: {
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    heading: {
      // width: widthScreen,
    },
    pbtnImage: {},

    bottomPlayBtn: {
      // marginTop: 20,
      alignSelf: 'center',
    },
    mainPicture: {
      // marginTop: 32,
      width: vh(30),
      height: vh(30),
      alignSelf: 'center',
    },
    questionBtn: {
      marginTop: vh(8),
      alignSelf: 'center',
    },
    lowMarginTop: {
      marginTop: vh(4),
    },
  });
  return (
    <Background
      isFooter={true}
      navigation={navigation}
      rightBtnCallback={() => {
        setBtnNumber(1);
        if (taskIndex !== 2) {
          setPressQestion(false);
          navigation.navigate('taskquestion', {
            taskIndex: 2,
          });
        } else {
          navigation.navigate('starttask', {
            title: 'послушай и соедени картинки парвльно',
            isFinalTask: true,
            audio: require('../../../assets/sounds/послушай и соедени картинки правильно.mp3'),
            duration: 2500,
          });
        }
      }}
      rightBtnPulse={btnNumber == 5}
    >
      <Title
        audio={audio1}
        onPress={() => {
          if (btnNumber == 1) {
            setBtnNumber(2);
          }
        }}
        disabled={!(btnNumber >= 1)}
        animation={btnNumber == 1 ? 'pulse' : ''}
        theme={name}
        number={1}
        colors={colors}
        title={phrase}
        style={[styles.heading, styles.lowMarginTop]}
      />
      {!pressQestion ? (
        <Animated.View
          style={[
            styles.questionBtn,
            {
              opacity: fadeBtnAnim,
            },
          ]}
        >
          <TouchableOpacity
            disabled={!(btnNumber >= 2)}
            onPress={async () => {
              if (btnNumber == 2) {
                setBtnNumber(3);
              }
              fadeOut(fadeBtnAnim);
              setTimeout(() => {
                setPressQestion(true);
                fadeIn(fadeMainAnim);
                fadeIn(fadeBtnAnim);
              }, 150);
            }}
          >
            <Animatable.Text
              animation={btnNumber == 2 ? 'pulse' : ''}
              easing='ease-out'
              iterationCount='infinite'
            >
              {Platform.OS === 'web' ? (
                <Image
                  source={{
                    uri:
                      name == 'dark'
                        ? require('../../../assets/web/qestionbtnL.svg')
                        : require('../../../assets/web/qestionbtnD.svg'),
                  }}
                  style={{ width: vh(19), height: vh(19) }}
                />
              ) : (
                <QestionBtn {...colors.qestionBtn} />
              )}
            </Animatable.Text>
          </TouchableOpacity>
        </Animated.View>
      ) : (
        <Animated.View
          style={{
            width: '100%',
            opacity: fadeMainAnim,
            ...styles.lowMarginTop,
          }}
        >
          {Platform.OS === 'web' ? (
            <Image
              source={{
                uri: image,
              }}
              style={[styles.mainPicture]}
            />
          ) : (
            <Image style={styles.mainPicture} source={image} />
          )}

          <Title
            audio={audio2}
            onPress={() => {
              if (btnNumber == 3) {
                setBtnNumber(4);
              }
            }}
            disabled={!(btnNumber >= 3)}
            animation={btnNumber == 3 ? 'pulse' : ''}
            theme={name}
            number={2}
            colors={colors}
            title={explanation}
            style={[styles.heading, styles.lowMarginTop]}
          />
          <AudioBtn
            audio={audio3}
            onPress={() => {
              if (btnNumber == 4) {
                setBtnNumber(5);
              }
            }}
            disabled={!(btnNumber >= 4)}
            animation={btnNumber == 4 ? 'pulse' : ''}
            style={[styles.bottomPlayBtn, styles.lowMarginTop]}
            theme={name}
            number={1}
            colors={colors}
          >
            {/* {Platform.OS === 'web' ? (
                <Image
                  source={{
                    uri:
                      name == 'dark'
                        ? require('../../../assets/web/playbtn1L.svg')
                        : require('../../../assets/web/playbtn1D.svg'),
                  }}
                  style={[{ width: 70, height: 70 }]}
                />
              ) : (
                <PlayBtn {...colors.purplePlayBtn} />
              )} */}
          </AudioBtn>
        </Animated.View>
      )}
    </Background>
  );
}

const fadeIn = fadeAnim => {
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 150,
  }).start();
};

const fadeOut = fadeAnim => {
  // Will change fadeAnim value to 0 in 3 seconds
  Animated.timing(fadeAnim, {
    toValue: 0,
    duration: 150,
  }).start();
};

const stopPulse = ref => {
  ref.current.stopAnimation();
};
