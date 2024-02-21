import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Item } from '../Model/items.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DatabaseService {
  @Input() todoItems: Item[] = [];
  constructor(private http: HttpClient) {}

  postTasks(task: Item) {
    this.http
      .post<Item>(
        'https://todo-app-30b79-default-rtdb.firebaseio.com/tasks.json',
        task
      )
      .subscribe();
  }

  getTasks(): Observable<Item[]> {
    return this.http
      .get<{ [key: string]: Item }>(
        'https://todo-app-30b79-default-rtdb.firebaseio.com/tasks.json'
      )
      .pipe(
        map((responseData) => {
          const tasksArray: Item[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              tasksArray.push(responseData[key]);
              this.todoItems = tasksArray;
            }
          }
          return this.todoItems;
        })
      );
  }
  deleteTasks(itemId: number) {
    return this.http.delete(
      'https://todo-app-30b79-default-rtdb.firebaseio.com/tasks.json/task'
    );
  }
}
