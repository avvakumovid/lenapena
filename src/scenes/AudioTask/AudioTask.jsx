import { View, Text, StyleSheet } from "react-native";
import React from "react";

export default function AudioTask() {
  return (
    <View style={styles.container}>
      <Text>AudioTask</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
});
