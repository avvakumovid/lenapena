import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import Background from '../../components/Background';
import { Context } from '../../context/context';
import TaskTitle from './../../components/icons/TaskTitle';
import { loadSounds } from '../../services/sounds';
import AudioBtn from '../../components/AudioBtn/AudioBtn';
import Heading from '../../components/Heading/Heading';

export default function StartTask({ navigation, route }) {
  const { name, colors } = useContext(Context);
  const [sound, setSound] = useState();
  const { title, isFinalTask, audio, duration } = route.params;

  useEffect(() => {
    async function fetch() {
      const loadedSound = await loadSounds([audio]);
      setSound(loadedSound[0]);
    }
    fetch();
  }, [audio]);
  const styles = StyleSheet.create({
    heading: {
      marginTop: 243,
      width: 350,
      // backgroundColor: 'red',
      flexWrap: 'wrap',
    },
  });
  return (
    <Background
      isFooter={true}
      leftBtnVisible={false}
      rightBtnVisible={false}
      navigation={navigation}
    >
      <View style={styles.heading}>
        <Heading
          audio={audio}
          onPress={() => {
            setTimeout(() => {
              if (!isFinalTask) {
                navigation.navigate('taskquestion', {
                  taskIndex: 1,
                });
              } else {
                navigation.navigate('finaltask');
              }
            }, duration);
          }}
          animation={'pulse'}
          theme={name}
          number={1}
          colors={colors}
          title={title}
          isOnlySubText={false}
        />
      </View>
    </Background>
  );
}
