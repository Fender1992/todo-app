import { createAction, props } from '@ngrx/store';
import { Item } from '../model/items.model';

export const loadTasks = createAction('[Todo List] Load Tasks');
export const loadTasksSuccess = createAction(
  '[Todo List] Load Tasks Success',
  props<{ tasks: Item[] }>()
);
export const addTask = createAction(
  '[Todo List] Add Task',
  props<{ task: Item }>()
);
export const addTaskSuccess = createAction(
  '[Todo List] Add Task Success',
  props<{ task: Item }>()
);
export const deleteTask = createAction(
  '[Todo List] Delete Task',
  props<{ firebaseKey: string }>()
);
export const deleteTaskSuccess = createAction(
  '[Todo List] Delete Task Success',
  props<{ firebaseKey: string }>()
);
