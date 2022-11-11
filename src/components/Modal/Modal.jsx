import React, { useContext, useEffect, useState } from 'react';
import { Modal, StyleSheet, Platform, Image, View } from 'react-native';
import { Context } from '../../context/context';
import CheckBtn from './../icons/CheckBtn';
import XBtn from './../icons/XBtn';
import useAudio from './../../hooks/useAudio';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

const ModalView = ({ isRight, modalVisible, success, mistake }) => {
  const { name, colors } = useContext(Context);

  useEffect(() => {
    console.log(success, mistake);
  }, []);

  return (
    <Modal animationType='fade' transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        {isRight &&
          (Platform.OS === 'web' ? (
            <Image
              source={{
                uri:
                  name == 'dark'
                    ? require('../../../assets/web/checkbtnL.svg')
                    : require('../../../assets/web/checkbtnD.svg'),
              }}
              style={[{ width: vh(16), height: vh(16) }]}
            />
          ) : (
            <CheckBtn {...colors.pinkPlayBtn} />
          ))}
        {!isRight &&
          (Platform.OS === 'web' ? (
            <Image
              source={{
                uri:
                  name == 'dark'
                    ? require('../../../assets/web/xbtnL.svg')
                    : require('../../../assets/web/xbtnD.svg'),
              }}
              style={[{ width: vh(16), height: vh(16) }]}
            />
          ) : (
            <XBtn {...colors.pinkPlayBtn} />
          ))}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ModalView;
