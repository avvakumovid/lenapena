import { View, SafeAreaView, Text, StyleSheet } from "react-native";
import React from "react";
import { useFonts } from "expo-font";

export default function AudioTask() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>AudioTask</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
  text: {
    fontFamily: "Franklin Gothic Medium",
  },
});
