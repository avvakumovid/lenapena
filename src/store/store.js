import { combineReducers, configureStore } from "@reduxjs/toolkit";
import taskReducer from "./slice/tasksSlice";

const rootReducer = combineReducers({
  tasks: taskReducer,
});
export const store = configureStore({
  reducer: rootReducer,
});
