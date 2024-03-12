import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Item } from '../Model/items.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class DatabaseService {
  @Input() todoItems: Item[] = [];
  constructor(private http: HttpClient, private authService: AuthService) {}
  uid: string = '';

  postTasks(task: Item): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(
      'https://todo-app-30b79-default-rtdb.firebaseio.com/tasks.json',
      task
    );
  }

  getTasks(): Observable<Item[]> {
    // console.log(this.authService.authToken);
    const headers = new HttpHeaders({
      'auth-token': this.authService.authToken,
    });
    return this.http
      .get<{ [key: string]: Item }>(
        'https://todo-app-30b79-default-rtdb.firebaseio.com/tasks.json',
        {
          headers,
        }
      )
      .pipe(
        map((responseData) => {
          const tasksArray: Item[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              const item = { ...responseData[key], firebaseKey: key };
              tasksArray.push(item);
              this.todoItems = tasksArray;
            }
          }
          return this.todoItems;
        })
      );
  }
  deleteTasks(firebaseKey: string) {
    return this.http.delete(
      `https://todo-app-30b79-default-rtdb.firebaseio.com/tasks/${firebaseKey}.json`
    );
  }
}
