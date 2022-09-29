import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Menu from "../scenes/Menu/Menu";
import StartTask from "../scenes/Task/StartTask";
import TaskQuestion from "../scenes/Task/TaskQuestion";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "fade",
      }}
    >
      <Stack.Screen name='menu' component={Menu} />
      <Stack.Screen name='starttask' component={StartTask} />
      <Stack.Screen name='taskquestion' component={TaskQuestion} />
    </Stack.Navigator>
  );
}
