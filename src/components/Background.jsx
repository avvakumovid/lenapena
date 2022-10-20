import { StyleSheet, View, SafeAreaView, Platform, Image } from 'react-native';
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
    paddingBottom: 62,
    maxWidth: 960,
    marginVertical: 0,
    marginHorizontal: 'auto',
  },
  blur: { flex: 1 },
});
