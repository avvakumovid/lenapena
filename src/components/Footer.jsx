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
import HomeBtn from './icons/HomeBtn';
import RightBtn from './icons/RightBtn';
import LeftBtn from './icons/LeftBtn';

const Footer = ({
  navigation,
  rightBtnCallback,
  leftBtnCallBack,
  leftBtnVisible = true,
  rightBtnVisible = true,
}) => {
  const { name, colors } = useContext(Context);
  return (
    <View style={styles.container}>
      {leftBtnVisible && (
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
                    ? require('../../assets/web/leftArrowL.svg')
                    : require('../../assets/web/leftArrowD.svg'),
              }}
              style={[{ width: 11, height: 24 }]}
            />
          ) : (
            <LeftBtn {...colors.footerSideBtn} />
          )}
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          navigation.navigate('menu');
        }}
      >
        {/* <Image
          style={styles.goHome}
          source={require('../../assets/images/goHomeAlt.svg')}
        /> */}
        {Platform.OS === 'web' ? (
          <Image
            source={{
              uri:
                name == 'dark'
                  ? require('../../assets/web/homeL.svg')
                  : require('../../assets/web/homeD.svg'),
            }}
            style={[{ width: 20, height: 22 }]}
          />
        ) : (
          <HomeBtn style={styles.goHome} {...colors.footerMiddleBtn} />
        )}
      </TouchableOpacity>
      {rightBtnVisible && (
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
                    ? require('../../assets/web/rightArrowL.svg')
                    : require('../../assets/web/rightArrowD.svg'),
              }}
              style={[{ width: 11, height: 24 }]}
            />
          ) : (
            <RightBtn {...colors.footerSideBtn} />
          )}
        </TouchableOpacity>
      )}
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
    alignSelf: 'flex-end',
  },
});
