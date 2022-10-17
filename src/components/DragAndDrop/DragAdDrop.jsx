import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React from 'react';
import PanGestureHandler from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler } from 'react-native-reanimated';

const DragAndDrop = ({ children }) => {
  const drag = useAnimatedGestureHandler({
    onStart: event => {
      console.log('DROP:', event.translationX, event.translationY);
    },
    onActive: event => {
      console.log('DROP:', event.translationX, event.translationY);
    },
    noEnd: event => {
      console.log('DROP:', event.translationX, event.translationY);
    },
  });
  return (
    // <PanGestureHandler onGestureEvent={drag}>
    <Animated>{children}</Animated>
    // </PanGestureHandler>
  );
};

export default DragAndDrop;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ball: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'blue',
  },
  pit: {
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
