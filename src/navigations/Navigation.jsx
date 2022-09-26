import { View, SafeAreaView, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AudioTask from "./../scenes/AudioTask/AudioTask";
import Menu from "../scenes/Menu/Menu";
import StartTask from "../scenes/Task/StartTask";
import Bakcground from "../components/Background";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "default",
      }}
    >
      <Stack.Screen name='menu' component={Menu} />
      <Stack.Screen name='starttask' component={StartTask} />
    </Stack.Navigator>
  );
}
