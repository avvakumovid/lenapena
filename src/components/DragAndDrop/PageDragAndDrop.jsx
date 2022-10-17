import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React from 'react';

import DragAndDrop from './DragAdDrop';

const PageDragAndDrop = () => {
  return (
    <SafeAreaView style={styles.screen}>
      <DragAndDrop>
        <View style={styles.ball} />
      </DragAndDrop>
      <View style={styles.pit}>
        <Text style={styles.text}>PIT</Text>
      </View>
    </SafeAreaView>
  );
};

export default PageDragAndDrop;

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
