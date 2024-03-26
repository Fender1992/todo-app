import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as TasksActions from './tasks.action';
import { DatabaseService } from '../services/database.service';
import { Item } from '../model/items.model';

@Injectable()
export class TasksEffects {
  constructor(
    private actions$: Actions,
    private databaseService: DatabaseService
  ) {}

  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.loadTasks),
      switchMap(() =>
        this.databaseService.getTasks().pipe(
          map((tasks) => TasksActions.loadTasksSuccess({ tasks })),
          catchError((error) => of(TasksActions.loadTasksFailure({ error })))
        )
      )
    )
  );
  addTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.addTask),
      switchMap((action) =>
        this.databaseService.postTasks(action.task).pipe(
          map((response: { name: string }) => ({
            id: Math.floor(Math.random() * 1000), // You need to generate an ID here, or the server should provide one
            task: response.name,
            completed: false, // Assuming new tasks are not completed by default
            createdAt: new Date(), // Use the current date/time
            UUID: '', // Populate UUID if needed
          })),
          map((item: Item) => TasksActions.addTasksSuccess({ task: [item] })),
          catchError((error) => of(TasksActions.loadTasksFailure({ error })))
        )
      )
    )
  );
}
