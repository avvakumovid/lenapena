import { StyleSheet, TouchableOpacity, Platform } from 'react-native';
import React, { useContext } from 'react';
import Background from './../../components/Background';
import { Context } from '../../context/context';
import { useDispatch } from 'react-redux';
import { setTasks } from '../../store/slice/tasksSlice';
import SunBtn from './../../components/icons/SunBtn';
import MoonBtn from './../../components/icons/MoonBtn';
import StartBtn from './../../components/icons/StartBtn';
import { useEffect, useRef, useState } from 'react';
import * as Animatable from 'react-native-animatable';

const Menu = ({ navigation }) => {
  const { changeTheme, name, colors } = useContext(Context);
  const dispatch = useDispatch();
  const anim = useRef(null);
  const onButtonClick = () => {
    anim.current.stopAnimation();
  };

  useEffect(() => {
    dispatch(setTasks());
  }, []);
  return (
    <Background>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('starttask', {
            title: 'ПОСЛУШАЙ И ЗАПОМНИ',
            isFinalTask: false,
            audio: require('../../../assets/sounds/ПОСЛУШАЙ И ЗАПОМНИ.mp3'),
            duration: 2000,
          });
        }}
        style={styles.container}
      >
        <Animatable.Text
          ref={anim}
          animation='pulse'
          easing='ease-out'
          iterationCount='infinite'
          style={[styles.btn]}
        >
          <StartBtn {...colors.startBtn} />
        </Animatable.Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          paddingVertical: 20,
        }}
        onPress={() => {
          changeTheme();
        }}
      >
        {name !== 'dark' ? (
          <SunBtn {...colors.themeBtn} />
        ) : (
          <MoonBtn {...colors.themeBtn} />
        )}
      </TouchableOpacity>
    </Background>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: 400,
  },
  btn: {
    marginTop: 220,
  },
});
