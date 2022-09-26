import { Button, StyleSheet, Text, View, SafeAreaView } from "react-native";
import React from "react";
import Background from "./../../components/Background";

const Menu = ({ navigation }) => {
  return (
    <Background>
      <View style={styles.container}>
        <Button
          title='Задания'
          onPress={() => {
            navigation.navigate("starttask");
          }}
        />
      </View>
    </Background>
  );
};

export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
