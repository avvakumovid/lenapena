import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Menu from '../scenes/Menu/Menu';
import StartTask from '../scenes/Task/StartTask';
import TaskQuestion from '../scenes/Task/TaskQuestion';
import FinalTaskWeb from '../scenes/Task/FinalTaskWeb';

const Stack = createNativeStackNavigator();

const forFade = ({ current }) => {
  console.log(current);
  return {
    cardStyle: {
      opacity: current.progress,
    },
  };
};

export default function Navigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Stack.Screen
        options={{ cardStyleInterpolator: forFade }}
        name='menu'
        component={Menu}
      />
      <Stack.Screen
        options={{ cardStyleInterpolator: forFade }}
        name='starttask'
        component={StartTask}
      />
      <Stack.Screen
        options={{ cardStyleInterpolator: forFade }}
        name='taskquestion'
        component={TaskQuestion}
      />

      <Stack.Screen
        options={{ cardStyleInterpolator: forFade }}
        name='finaltask'
        component={FinalTaskWeb}
      />
    </Stack.Navigator>
  );
}
