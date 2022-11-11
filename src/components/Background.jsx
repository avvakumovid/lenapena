import { StyleSheet, View, SafeAreaView, Dimensions } from 'react-native';
import React from 'react';
import Footer from './Footer';
import { Context } from './../context/context';
import { useContext } from 'react';
const { width, height } = Dimensions.get('window');

const Background = ({
  children,
  isFooter = false,
  navigation,
  rightBtnCallback,
  leftBtnCallBack,
  leftBtnVisible,
  rightBtnVisible,
  rightBtnPulse,
}) => {
  const { colors } = useContext(Context);

  const styles = StyleSheet.create({
    wrapper: {
      height: '100%',
      width: width > 600 ? 600 : width,
      marginVertical: 0,
      backgroundColor: colors.backgroundColor,
      marginHorizontal: 'auto',
      padding: 50,
    },
    container: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      overflow: 'hidden',
      touchAction: 'none',
      backgroundColor: colors.backgroundColor,
      padingHorizontal: 50,
    },
    body: {
      height: '100%',
      width: '100%',
      backgroundColor: colors.backgroundColor,
    },
  });

  return (
    <SafeAreaView style={styles.body}>
      <SafeAreaView style={styles.wrapper}>
        <SafeAreaView style={styles.container}>{children}</SafeAreaView>
        {isFooter && (
          <Footer
            navigation={navigation}
            rightBtnCallback={rightBtnCallback}
            leftBtnCallBack={leftBtnCallBack}
            leftBtnVisible={leftBtnVisible}
            rightBtnVisible={rightBtnVisible}
            rightBtnPulse={rightBtnPulse}
          />
        )}
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default Background;
