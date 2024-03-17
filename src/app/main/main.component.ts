import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DateService } from '../services/date.service';
import { HandleItems } from '../services/handleItems.service';
import { Item } from '../model/items.model';
import { DatabaseService } from '../services/database.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [DateService, HandleItems, DatabaseService],
})
export class MainComponent implements OnInit {
  currentDate: any;
  todoItems: Item[] = [];
  taskInput: string = '';
  completed: boolean = false;
  UUID: string = '';
  @ViewChild('taskInputRef') taskInputRef!: ElementRef;

  constructor(
    private dateService: DateService,
    private handleItems: HandleItems,
    private databaseService: DatabaseService,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.currentDate = this.dateService.date;
    this.todoItems = this.handleItems.item;
    this.databaseService.getTasks().subscribe((tasks: Item[]) => {
      this.todoItems = tasks;
      setTimeout(() => this.taskInputRef.nativeElement.focus(), 0);
    });
  }

  onAddTask() {
    this.UUID = this.authService.authUUID;
    if (this.taskInput.trim() === '') {
      return;
    }
    // if (!this.authService.authUUID) {
    //   console.log('User not authenticated!');
    //   return;
    // }
    const newItem = new Item(this.taskInput, false, Date(), this.UUID);
    this.databaseService.postTasks(newItem).subscribe((response) => {
      newItem.firebaseKey = response.name;
      // console.log(response.name);
      this.todoItems.push(newItem);
    });
    this.databaseService.postTasks(newItem);
    // console.log(this.todoItems);
    this.taskInput = '';
  }
  onDeleteTask(firebaseKey: string) {
    this.databaseService.deleteTasks(firebaseKey!).subscribe(() => {
      this.todoItems = this.todoItems.filter(
        (task) => task.firebaseKey !== firebaseKey
      );
    });
  }

  allTasksCompleted(): boolean {
    return (
      this.todoItems.length > 0 &&
      this.todoItems.every((task) => task.completed)
    );
  }

  tasksRemaining(): boolean {
    return this.todoItems.some((task) => !task.completed);
  }
}
