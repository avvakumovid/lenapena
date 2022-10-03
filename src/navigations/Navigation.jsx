import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Menu from "../scenes/Menu/Menu";
import StartTask from "../scenes/Task/StartTask";
import TaskQuestion from "../scenes/Task/TaskQuestion";
import FinalTask from "./../scenes/Task/FinalTask";
import DragAndDrop from "./../scenes/DragAndDrop/DragAndDrop";
import DnD from "./../scenes/DragAndDrop/DnD";
import DnD2 from "./../scenes/DragAndDrop/DnD2";
import DnD3 from "../scenes/Task/FinalTask";
import FinalTask2 from "../scenes/Task/FinalTask copy";

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
      <Stack.Screen name='finaltask' component={FinalTask} />
    </Stack.Navigator>
  );
}
