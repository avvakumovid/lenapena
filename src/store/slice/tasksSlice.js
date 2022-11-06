import { createSlice } from '@reduxjs/toolkit';
import { getRandomTasks } from '../../services/tasks';
import { data } from './../../../data/task';
const initialState = {
  tasks: [
    {
      isAccepted: false,
    },
  ],
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: state => {
      const tasks = getRandomTasks(data);
      state.tasks = tasks.map(task => ({ ...task, isAccepted: false }));
    },
    acceptTask(state, action) {
      const tasks = [...state.tasks];
      tasks[action.payload].isAccepted = true;
      state.tasks = tasks;
    },
    setNewTask: state => {
      // if (data.length - state.tasks.length <= 1) {
      //   state.tasks = [];
      // }
      // var s = data.filter(function (item) {
      //   return state.tasks.indexOf(item) === -1;
      // });
      console.log([...state.tasks]);
      const tasks = getRandomTasks(data);
      state.tasks = tasks.map(task => ({ ...task, isAccepted: false }));
    },
  },
});

export const { setTasks, acceptTask, setNewTask } = tasksSlice.actions;

export default tasksSlice.reducer;
