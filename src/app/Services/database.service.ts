import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Item } from '../model/items.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { EMPTY } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable({ providedIn: 'root' })
export class DatabaseService {
  @Input() todoItems: Item[] = [];
  DB_URL = 'https://todo-app-30b79-default-rtdb.firebaseio.com';
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private store: Store
  ) {}
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
    console.log('Attempting to post task:', task);
    console.log('AuthToken:', this.authService.authToken);
    console.log('AuthUUID:', this.authService.authUUID);

    const headers = new HttpHeaders({
      'auth-token': this.authService.authToken,
    });

    if (!this.authService.authToken || !this.authService.authUUID) {
      console.error('Authentication token or user ID is missing');
      return EMPTY;
    }

    const userId = this.authService.authUUID;
    if (!userId) {
      console.error('User ID is missing');
      return EMPTY;
    }
    const url = this.DB_URL + `/users/${userId}/tasks.json`;

    return this.http.post<{ name: string }>(url, task, { headers });
  }

  async getTasks(): Promise<Observable<Item[]>> {
    const headers = new HttpHeaders({
      'auth-token': this.authService.authToken,
    });
    return this.http
      .get<{ [key: string]: Item }>(
        this.DB_URL + `/users/${this.authService.authUUID}/tasks.json`,
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
      this.DB_URL + `/users/${this.authService.authUUID}/tasks.json`
    );
  }
}
