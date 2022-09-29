import { createSlice } from "@reduxjs/toolkit";
import { getRandomTasks } from "../../services/tasks";
import { data } from "./../../../data/task";
const initialState = {
  tasks: [
    {
      isAccepted: false,
    },
  ],
};

export const tasksSlice = createSlice({
  name: "tasks",
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
  },
});

export const { setTasks, acceptTask } = tasksSlice.actions;

export default tasksSlice.reducer;
