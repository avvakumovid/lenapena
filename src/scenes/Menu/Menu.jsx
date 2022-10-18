import { Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import React, { useContext } from 'react';
import Background from './../../components/Background';
import { Context } from '../../context/context';
import { data } from './../../../data/task';
import { useDispatch } from 'react-redux';
import { setTasks } from '../../store/slice/tasksSlice';
import SunBtn from './../../components/icons/SunBtn';
import MoonBtn from './../../components/icons/MoonBtn';
import StartBtn from './../../components/icons/StartBtn';

const Menu = ({ navigation }) => {
  const { changeTheme, name, colors } = useContext(Context);
  const dispatch = useDispatch();
  dispatch(setTasks());
  return (
    <Background>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('starttask', {
            subTitle: 'ПОСЛУШАЙ И ЗАПОМНИ',
          });
        }}
        style={styles.container}
      >
        {/* <HomeBtn style={styles.btn} {...colors.startBtn} /> */}

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
