import { StyleSheet, TouchableOpacity, Platform } from 'react-native';
import React, { useContext } from 'react';
import Background from './../../components/Background';
import { Context } from '../../context/context';
import { useDispatch } from 'react-redux';
import { setTasks } from '../../store/slice/tasksSlice';
import SunBtn from './../../components/icons/SunBtn';
import MoonBtn from './../../components/icons/MoonBtn';
import StartBtn from './../../components/icons/StartBtn';
import { useEffect } from 'react';

const Menu = ({ navigation }) => {
  const { changeTheme, name, colors } = useContext(Context);
  const dispatch = useDispatch();
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
            duration: 1300,
          });
        }}
        style={styles.container}
      >
        <StartBtn
          style={[styles.btn, Platform.OS == 'web' ? { marginTop: 200 } : null]}
          {...colors.startBtn}
        />
      </TouchableOpacity>
      <TouchableOpacity
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
  },
  btn: {
    marginTop: 243,
  },
});
