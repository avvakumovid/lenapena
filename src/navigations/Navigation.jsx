import { View, SafeAreaView, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AudioTask from "./../scenes/AudioTask/AudioTask";
import Menu from "../scenes/Menu/Menu";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name='menu' component={Menu} />
      <Stack.Screen name='audiotask' component={AudioTask} />
    </Stack.Navigator>
  );
}
