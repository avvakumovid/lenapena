import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React, { useContext } from 'react';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { Context } from '../context/context';
import HomeBtn from '../../assets/images/HomeBtn';

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
        <Icon name='arrow-left' size={25} color={colors.footerSideBtn} />
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
        <HomeBtn
          style={styles.goHome}
          externalBorderColor={colors.footerMiddleBtn}
        />
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
        <Icon name='arrow-right' size={25} color={colors.footerSideBtn} />
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
