import {
  StyleSheet,
  View,
  SafeAreaView,
  Platform,
  Image,
  ScrollView,
} from 'react-native';
import React, { useContext } from 'react';
import { Context } from '../context/context';

const Background = ({ children }) => {
  const { colors } = useContext(Context);

  return (
    <SafeAreaView
      style={{ ...styles.blur, backgroundColor: colors.backgroundColor }}
    >
      <SafeAreaView style={styles.container}>{children}</SafeAreaView>
    </SafeAreaView>
  );
};

export default Background;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 22,
    maxWidth: 960,
    marginVertical: 0,
    marginHorizontal: 'auto',
    overflow: 'hidden',
    touchAction: 'none',
  },
  blur: {
    flex: 1,
    overflow: 'hidden',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
