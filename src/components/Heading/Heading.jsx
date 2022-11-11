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
      // alignSelf: 'center',
    },
    subTitle: {
      justifyContent: 'center',
    },
    titleText: {
      fontFamily: 'Franklin Gothic Medium',
      fontStyle: 'italic',
      fontWeight: '400',
      fontSize: 32,
      textTransform: 'uppercase',
      color: colors.headingTextColor,
    },
    subText: {
      marginTop: -10,
      fontFamily: 'Franklin Gothic Medium',
      fontWeight: '400',
      fontStyle: 'italic',
      fontSize: 20,
      textTransform: 'uppercase',
      textAlign: 'left',
      color: colors.mainTextColor,
      width: 255,
      alignSelf: 'flex-end',
    },
  });

  return (
    <>
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
          {Platform.OS === 'web' ? (
            <Image
              source={{
                uri:
                  theme == 'dark'
                    ? require('../../../assets/web/taskTitleL.svg')
                    : require('../../../assets/web/taskTitleD.svg'),
              }}
              style={[styles.titleText, { width: 181, height: 34 }]}
            />
          ) : (
            <TaskTitle style={styles.titleText} {...colors.qestionText} />
          )}
        </View>
      </View>
      <Text style={styles.subText}>{title}</Text>
    </>
  );
};

export default Heading;
