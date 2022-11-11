import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import React, { useContext } from 'react';
import { Context } from '../context/context';
import HomeBtn from './icons/HomeBtn';
import RightBtn from './icons/RightBtn';
import LeftBtn from './icons/LeftBtn';
import * as Animatable from 'react-native-animatable';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

const Footer = ({
  navigation,
  rightBtnCallback,
  leftBtnCallBack,
  leftBtnVisible = true,
  rightBtnVisible = true,
  rightBtnPulse = false,
}) => {
  const { name, colors } = useContext(Context);
  const styles = StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      justifyContent:
        rightBtnVisible && leftBtnVisible ? 'space-between' : 'center',
      alignItems: 'center',
      alignSelf: 'flex-end',
      paddingVertical: vh(2),
      paddingHorizontal: 12.5,
      marginHorizontal: 50,
      padingHorizontal: 50,
      alignSelf: 'center',
    },
  });
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
              style={[{ width: vh(2.5), height: vh(2.5) }]}
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
            style={[{ width: vh(2.5), height: vh(2.5) }]}
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
          <Animatable.View
            animation={rightBtnPulse ? 'pulse' : ''}
            easing='ease-out'
            iterationCount='infinite'
          >
            {Platform.OS === 'web' ? (
              <Image
                source={{
                  uri:
                    name == 'dark'
                      ? require('../../assets/web/rightArrowL.svg')
                      : require('../../assets/web/rightArrowD.svg'),
                }}
                style={[{ width: vh(2.5), height: vh(2.5) }]}
              />
            ) : (
              <RightBtn {...colors.footerSideBtn} />
            )}
          </Animatable.View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Footer;
