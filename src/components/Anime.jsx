import { Button, StyleSheet, Text, View, Animated } from 'react-native';
import React, { useRef, useState } from 'react';

const Anime = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  return (
    <View style={styles.container}>
      <Button title='Press' onPress={fadeIn} />
      <Button title='Press2' onPress={fadeOut} />
      <Animated.View
        style={[styles.main, { opacity: fadeAnim }]}
      ></Animated.View>
    </View>
  );
};

export default Anime;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    marginTop: 20,
    width: 100,
    height: 100,
    borderRadius: 900,
    backgroundColor: 'lightpink',
  },
});
