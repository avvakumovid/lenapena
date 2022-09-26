import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";

const Menu = ({ navigation }) => {
  return (
    <View>
      <Button
        title='Задания'
        onPress={() => {
          navigation.navigate("audiotask");
        }}
      />
    </View>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
  },
});
