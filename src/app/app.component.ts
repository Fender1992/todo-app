import { Component, OnInit } from '@angular/core';
import { DateService } from './Services/date.service';
import { HandleItems } from './Services/handleItems.service';
import { Item } from './Model/items.model';
import { DatabaseService } from './Services/database.service';
import { AuthService } from './Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [],
})
export class AppComponent implements OnInit {
  isLoggedIn = false;
  // currentDate: any;
  // todoItems: Item[] = [];
  // taskInput: string = '';
  // completed: boolean = false;
  // constructor(
  //   private dateService: DateService,
  //   private handleItems: HandleItems,
  //   private databaseService: DatabaseService
  // ) {}
  // ngOnInit() {
  //   this.currentDate = this.dateService.date;
  //   this.todoItems = this.handleItems.item;
  //   this.databaseService.getTasks().subscribe((tasks: Item[]) => {
  //     this.todoItems = tasks;
  //   });
  // }
  // onAddTask() {
  //   if (this.taskInput.trim() === '') {
  //     return;
  //   }
  //   const newItem = new Item(this.taskInput, false, Date());
  //   this.databaseService.postTasks(newItem).subscribe((response) => {
  //     newItem.firebaseKey = response.name;
  //     this.todoItems.push(newItem);
  //   });
  //   // this.databaseService.postTasks(newItem);
  //   // console.log(this.todoItems);
  //   this.taskInput = '';
  // }
  // onDeleteTask(firebaseKey: string) {
  //   this.databaseService.deleteTasks(firebaseKey!).subscribe(() => {
  //     this.todoItems = this.todoItems.filter(
  //       (task) => task.firebaseKey !== firebaseKey
  //     );
  //   });
  // }
  // allTasksCompleted(): boolean {
  //   return (
  //     this.todoItems.length > 0 &&
  //     this.todoItems.every((task) => task.completed)
  //   );
  // }
  // tasksRemaining(): boolean {
  //   return this.todoItems.some((task) => !task.completed);
  // }
  constructor(private authService: AuthService) {}
  ngOnInit() {
    this.authService.autoLogin();
  }
}
