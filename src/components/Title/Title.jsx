import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native';
import React, { useEffect } from 'react';
import AudioBtn from '../AudioBtn/AudioBtn';
import TaskTitle from '../icons/TaskTitle';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

const { width, height } = Dimensions.get('window');

const Title = ({
  audio,
  onPress,
  animation,
  theme,
  number,
  colors,
  title,
  isOnlySubText = true,
  style,
}) => {
  const styles = StyleSheet.create({
    title: {
      flexDirection: 'row',
      alignSelf: 'center',
      marginLeft: vw(10),
    },
    subTitle: {
      justifyContent: 'center',
    },
    titleText: {
      fontFamily: 'Franklin Gothic Medium',
      fontStyle: 'italic',
      fontWeight: '400',
      fontSize: vh(6.45),
      textTransform: 'uppercase',
      color: colors.headingTextColor,
    },
    subText: {
      marginTop: -10,
      fontFamily: 'Franklin Gothic Medium',
      fontWeight: '400',
      fontStyle: 'italic',
      fontSize: vh(3.2),
      textTransform: 'uppercase',
      textAlign: 'left',
      color: colors.mainTextColor,
      width: width > 600 ? 500 : width - 120,
      alignSelf: 'flex-end',
    },
  });

  return (
    <View style={[styles.title, style]}>
      <AudioBtn
        audio={audio}
        onPress={onPress}
        animation={animation}
        theme={theme}
        number={number}
        colors={colors}
      />

      <View style={styles.subTitle}>
        <Text style={styles.subText}>{title}</Text>
      </View>
    </View>
  );
};

export default Title;
