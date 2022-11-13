import { Platform, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import * as Animatable from 'react-native-animatable';
import useAudio from './../../hooks/useAudio';
import PlayBtn from '../icons/PlayBtn';
import PauseBtn from './../icons/PauseBtn';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

const AudioBtn = ({
  audio,
  children,
  onPress,
  disabled = false,
  animation,
  style = {},
  theme,
  number,
  colors,
}) => {
  const anim = useRef(null);
  const { isSoundPlay, pauseSound, playSound, setIsSoundPlay } =
    useAudio(audio);

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={async () => {
        if (!isSoundPlay) {
          setIsSoundPlay(true);
          playSound();
        } else {
          setIsSoundPlay(false);
          pauseSound();
        }
        onPress();
      }}
      style={style}
    >
      <Animatable.Text
        ref={anim}
        animation={animation}
        easing='ease-out'
        iterationCount='infinite'
        // android_hyphenationFrequency='full'
      >
        {Platform.OS === 'web' ? (
          <Image
            source={{
              uri: getWebImage(theme, isSoundPlay ? 'pause' : 'play', number),
            }}
            style={styles.playBtn}
          />
        ) : isSoundPlay ? (
          number == 1 ? (
            <PauseBtn style={styles.playBtn} {...colors.pinkPlayBtn} />
          ) : (
            <PauseBtn style={styles.playBtn} {...colors.purplePlayBtn} />
          )
        ) : number == 1 ? (
          <PlayBtn style={styles.playBtn} {...colors.pinkPlayBtn} />
        ) : (
          <PlayBtn style={styles.playBtn} {...colors.purplePlayBtn} />
        )}
      </Animatable.Text>
    </TouchableOpacity>
  );
};

export default AudioBtn;

const styles = StyleSheet.create({
  playBtn: {
    marginLeft: 10,
    marginRight: 15,
    alignSelf: 'flex-end',
    width: vh(10.5),
    height: vh(10.5),
  },
});

const getWebImage = (theme, type, number) => {
  if (theme == 'dark') {
    if (type == 'play') {
      if (number == 1) {
        return require('../../../assets/web/playbtn1L.svg');
      } else {
        return require('../../../assets/web/playbtn2L.svg');
      }
    } else {
      if (number == 1) {
        return require('../../../assets/web/pauseBtn1L.svg');
      } else {
        return require('../../../assets/web/pauseBtn2L.svg');
      }
    }
  } else {
    if (type == 'play') {
      if (number == 1) {
        return require('../../../assets/web/playbtn1D.svg');
      } else {
        return require('../../../assets/web/playbtn2D.svg');
      }
    } else {
      if (number == 1) {
        return require('../../../assets/web/pauseBtn1D.svg');
      } else {
        return require('../../../assets/web/pauseBtn2D.svg');
      }
    }
  }
};
