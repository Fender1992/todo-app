import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Item } from '../Model/items.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { EMPTY } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DatabaseService {
  @Input() todoItems: Item[] = [];
  constructor(private http: HttpClient, private authService: AuthService) {}
  dbUUID = this.authService.authUUID;

  // postTasks(task: Item): Observable<{ name: string }> {
  //   if(this.dbUUID === this.authService.authUUID){
  //     this.http.post<{ name: string }>(
  //     'https://todo-app-30b79-default-rtdb.firebaseio.com/tasks.json',
  //     task
  //   }else{

  //     return
  //   }
  //   );
  // }
  postTasks(task: Item): Observable<{ name: string }> {
    // Ensure you have access to this.dbUUID, assuming it contains the UUID for the user's table
    if (this.dbUUID === this.authService.authUUID) {
      // Post the task to the user's table
      return this.http.post<{ name: string }>(
        `https://todo-app-30b79-default-rtdb.firebaseio.com/users/${this.authService.authUUID}/tasks.json`,
        task
      );
    } else {
      // If the UUIDs do not match, do nothing or handle the case accordingly
      console.log('UUIDs do not match. Task not added.');
      return EMPTY; // or throwError('UUIDs do not match.');
    }
  }

  getTasks(): Observable<Item[]> {
    // console.log(this.authService.authToken);
    const headers = new HttpHeaders({
      'auth-token': this.authService.authToken,
    });
    return this.http
      .get<{ [key: string]: Item }>(
        `https://todo-app-30b79-default-rtdb.firebaseio.com/users/${this.authService.authUUID}/tasks.json`,
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
      `https://todo-app-30b79-default-rtdb.firebaseio.com/users/${this.authService.authUUID}/tasks.json`
    );
  }
}
