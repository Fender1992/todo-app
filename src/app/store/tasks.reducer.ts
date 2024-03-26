import { createReducer, on } from '@ngrx/store';
import { Item } from '../model/items.model';
import * as TasksActions from './tasks.action';

export interface TasksState {
  tasks: Item[];
  loading: boolean;
  error: any;
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

export const taskReducer = createReducer(
  initialState,
  on(TasksActions.loadTasks, (state) => ({ ...state, loading: true })),
  on(TasksActions.loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks,
    loading: false,
    error: null,
  })),
  on(TasksActions.loadTasksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(TasksActions.addTask, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task],
  })),
  on(TasksActions.removeTask, (state, { firebaseKey }) => ({
    ...state,
    tasks: state.tasks.filter((task) => task.firebaseKey !== firebaseKey),
  })),
  on(TasksActions.updateTask, (state, { firebaseKey, task }) => ({
    ...state,
    tasks: state.tasks.map((t) => (t.firebaseKey === firebaseKey ? task : t)),
  }))
);
