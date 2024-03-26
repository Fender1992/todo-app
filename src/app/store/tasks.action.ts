import { createAction, props } from '@ngrx/store';
import { Item } from '../model/items.model';

export const loadTasks = createAction('[Tasks] Load Tasks');
export const addTasks = createAction(
  '[Tasks] Add Tasks',
  props<{ task: Item }>()
);
export const addTasksSuccess = createAction(
  '[Tasks] Add Tasks Success',
  props<{ task: Item[] }>()
);
export const loadTasksSuccess = createAction(
  '[Tasks] Load Tasks Success',
  props<{ tasks: Item[] }>()
);
export const loadTasksFailure = createAction(
  '[Tasks] Load Tasks Failure',
  props<{ error: any }>()
);

export const addTask = createAction(
  '[Tasks] Add Task',
  props<{ task: Item }>()
);
export const removeTask = createAction(
  '[Tasks] Remove Task',
  props<{ firebaseKey: string }>()
);
export const updateTask = createAction(
  '[Tasks] Update Task',
  props<{ firebaseKey: string; task: Item }>()
);
