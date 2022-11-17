import { createSlice } from '@reduxjs/toolkit';
import { getRandomTasks } from '../../services/tasks';
import { data } from './../../../data/task';
const initialState = {
  tasks: [
    {
      isAccepted: false,
    },
  ],
  complitedTaskId: [],
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: state => {
      if (state.tasks.length) {
        state.complitedTaskId = [
          ...state.complitedTaskId,
          ...state.tasks.map(task => task.id),
        ];
      }
      if (data.length - state.complitedTaskId.length <= 1) {
        state.complitedTaskId = [];
      }
      const tasks = getRandomTasks(
        data.filter(task => {
          const res = state.complitedTaskId.findIndex(c => c == task.id);
          return res == -1;
        })
      );
      state.tasks = tasks;
    },
    acceptTask(state, action) {
      const tasks = [...state.tasks];
      tasks[action.payload].isAccepted = true;
      state.tasks = tasks;
    },
    setNewTask: state => {
      console.log([...state.tasks]);
      const tasks = getRandomTasks(data);
      state.tasks = tasks.map(task => ({ ...task, isAccepted: false }));
    },
  },
});

export const { setTasks, acceptTask, setNewTask } = tasksSlice.actions;

export default tasksSlice.reducer;
