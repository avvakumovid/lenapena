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

const Heading = ({
  audio,
  onPress,
  animation,
  theme,
  number,
  colors,
  title,
  style,
}) => {
  const styles = StyleSheet.create({
    title: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      // marginLeft: vw(2),
    },
    subTitle: {
      fontFamily: 'Franklin Gothic Medium',
      fontWeight: '400',
      display: 'flex',
      fontStyle: 'italic',
      fontSize: vh(6.75),
      textTransform: 'uppercase',
      textAlign: 'left',
      color: colors.mainTextColor,
    },
    titleText: {
      fontFamily: 'Franklin Gothic Medium',
      fontStyle: 'italic',
      fontWeight: '400',
      fontSize: vh(6),
      textTransform: 'uppercase',
      color: colors.headingTextColor,
    },
    subText: {
      marginTop: 10,
      fontFamily: 'Franklin Gothic Medium',
      fontWeight: '400',
      fontStyle: 'italic',
      fontSize: vh(3),
      textTransform: 'uppercase',
      textAlign: 'left',
      color: colors.mainTextColor,
      maxWidth: width > 600 ? 500 : vw(60),
    },
    text: {
      display: 'flex',
      flexDirection: 'column',
    },
  });

  return (
    <View style={[styles.title]}>
      <AudioBtn
        audio={audio}
        onPress={onPress}
        animation={animation}
        theme={theme}
        number={number}
        colors={colors}
      />
      <View style={styles.text}>
        {Platform.OS === 'web' ? (
          <Image
            source={{
              uri:
                theme == 'dark'
                  ? require('../../../assets/web/taskTitleL.svg')
                  : require('../../../assets/web/taskTitleD.svg'),
            }}
            style={[styles.titleText, { width: vh(30), height: vh(4.5) }]}
          />
        ) : (
          <TaskTitle style={styles.titleText} {...colors.qestionText} />
        )}
        <Text style={styles.subText}>{title}</Text>
      </View>
    </View>
  );
};

export default Heading;
