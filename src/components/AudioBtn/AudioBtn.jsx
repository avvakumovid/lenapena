import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import * as Animatable from 'react-native-animatable';
import { loadSound, playSound } from '../../services/sounds';

const AudioBtn = ({
  audio,
  children,
  onPress,
  disabled = false,
  animation,
  style = {},
}) => {
  const anim = useRef(null);
  const [sound, setSound] = useState();

  useEffect(() => {
    async function fetch() {
      const loadedSound = await loadSound(audio);
      setSound(loadedSound);
    }
    fetch();
  }, [audio]);

  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={() => {
        playSound(sound);
        onPress();
      }}
      style={style}
    >
      <Animatable.Text
        ref={anim}
        animation={animation}
        easing='ease-out'
        iterationCount='infinite'
      >
        {children}
      </Animatable.Text>
    </TouchableOpacity>
  );
};

export default AudioBtn;

const styles = StyleSheet.create({});
