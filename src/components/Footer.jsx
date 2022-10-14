import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import React, { useContext } from 'react';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import { Context } from '../context/context';
import HomeBtn from '../../assets/images/HomeBtn';
import RightBtn from '../../assets/images/RightBtn';
import LeftBtn from './../../assets/images/LeftBtn';

const Footer = ({ navigation, rightBtnCallback, leftBtnCallBack }) => {
  const { name, colors } = useContext(Context);
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
        {Platform.OS === 'web' ? (
          <Image
            source={{
              uri:
                name == 'dark'
                  ? require('../../assets/web/leftArrowL.png')
                  : require('../../assets/web/leftArrowD.png'),
            }}
            style={[{ width: 11, height: 24 }]}
          />
        ) : (
          <LeftBtn {...colors.footerSideBtn} />
        )}
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
        {Platform.OS === 'web' ? (
          <Image
            source={{
              uri:
                name == 'dark'
                  ? require('../../assets/web/homeL.png')
                  : require('../../assets/web/homeD.png'),
            }}
            style={[{ width: 20, height: 22 }]}
          />
        ) : (
          <HomeBtn style={styles.goHome} {...colors.footerMiddleBtn} />
        )}
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
        {Platform.OS === 'web' ? (
          <Image
            source={{
              uri:
                name == 'dark'
                  ? require('../../assets/web/rightArrowL.png')
                  : require('../../assets/web/rightArrowD.png'),
            }}
            style={[{ width: 11, height: 24 }]}
          />
        ) : (
          <RightBtn {...colors.footerSideBtn} />
        )}
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
