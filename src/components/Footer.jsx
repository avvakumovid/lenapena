import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React, { useContext } from 'react';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { Context } from '../context/context';
import HomeBtn from '../../assets/images/HomeBtn';
import RightBtn from '../../assets/images/RightBtn';
import LeftBtn from './../../assets/images/LeftBtn';

const Footer = ({ navigation, rightBtnCallback, leftBtnCallBack }) => {
  const { colors } = useContext(Context);
  console.log('footer', colors);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          if (leftBtnCallBack) {
            leftBtnCallBack();
          } else {
            navigation.goBack();
          }
        }}
      >
        <LeftBtn {...colors.footerSideBtn} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          navigation.navigate('menu');
        }}
      >
        {/* <Image
          style={styles.goHome}
          source={require('../../assets/images/goHomeAlt.png')}
        /> */}
        <HomeBtn style={styles.goHome} {...colors.footerMiddleBtn} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          if (rightBtnCallback) {
            rightBtnCallback();
          } else {
            navigation.goBack();
          }
        }}
      >
        <RightBtn {...colors.footerSideBtn} />
      </TouchableOpacity>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
