import React, { useContext, useState } from 'react';
import { Modal, StyleSheet, Platform, Image, View } from 'react-native';
import { Context } from '../../context/context';
import CheckBtn from './../icons/CheckBtn';
import XBtn from './../icons/XBtn';

const App = ({ isRight, modalVisible }) => {
  const { name, colors } = useContext(Context);
  return (
    <Modal animationType='fade' transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        {isRight &&
          (Platform.OS === 'web' ? (
            <Image
              source={{
                uri:
                  name == 'dark'
                    ? require('../../../assets/images/checkbtn.png')
                    : require('../../../assets/images/checkbtnD.png'),
              }}
              style={[{ width: 116, height: 91 }]}
            />
          ) : (
            <CheckBtn {...colors.pinkPlayBtn} />
          ))}
        {!isRight &&
          (Platform.OS === 'web' ? (
            <Image
              source={{x
                uri:
                  name == 'dark'
                    ? require('../../../assets/images/xbtn.png')
                    : require('../../../assets/images/xbtnD.png'),
              }}
              style={[{ width: 116, height: 116 }]}
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

export default App;
