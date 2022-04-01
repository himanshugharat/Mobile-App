import {
  ADD_TASK,
  UPDATE_TASK,
  GET_ALL_TASK,
  ADD_LOCAL_DATA,
  GET_LOCAL_DATA,
  REMOVE_LOCAL_DATA,
  ATTENDENCE_DATA,
  BUTTON_STEPPER,
  UPDATE_TIME,
  UPDATE_PLACE,
  UPDATE_ACTION,
  ADD_TASK_ACTION,
} from './taskType';
export const addTask = task => ({
  type: ADD_TASK,
  payload: task,
});
export const getAllTask = id => ({
  type: GET_ALL_TASK,
  payload: id,
});
export const updateTask = id => ({
  type: UPDATE_TASK,
  payload: id,
});
export const addLocalData = data => ({
  type: ADD_LOCAL_DATA,
  payload: data,
});
export const getLocalData = id => ({
  type: GET_LOCAL_DATA,
  payload: id,
});
export const removeLocalData = () => ({
  type: REMOVE_LOCAL_DATA,
  // payload: id,
});
export const attendenceData = id => ({
  type: ATTENDENCE_DATA,
  payload: id,
});
export const updateStepperButton = id => ({
  type: BUTTON_STEPPER,
  payload: id,
});
export const updateTaskList = id => ({
  type: UPDATE_TIME,
  payload: id,
});
export const updateTaskListInComplete = id => ({
  type: UPDATE_PLACE,
  payload: id,
});
export const updateTaskAction = id => ({
  type: UPDATE_ACTION,
  payload: id,
});
export const addTaskAction = id => ({
  type: ADD_TASK_ACTION,
  payload: id,
});
