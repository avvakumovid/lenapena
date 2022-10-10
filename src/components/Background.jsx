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
    // backgroundColor: "rgba(87, 83, 83, 0.17);",
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 42,
    // paddingHorizontal: 20,
  },
  blur: { flex: 1 },
  botBgImg: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  topBgImg: {
    position: 'absolute',
    right: 0,
  },
});
