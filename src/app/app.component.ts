import { Component } from '@angular/core';
import { DateService } from './Services/date.service';
import { HandleItems } from './Services/handleItems.service';
import { Item } from './Model/items.model';
import { DatabaseService } from './Services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DateService, HandleItems, DatabaseService],
})
export class AppComponent {
  currentDate: any;
  todoItems: Item[] = [];
  taskInput: string = '';
  constructor(
    private dateService: DateService,
    private handleItems: HandleItems,
    private databaseService: DatabaseService
  ) {}
  ngOnInit() {
    this.currentDate = this.dateService.date;
    this.todoItems = this.handleItems.item;
    this.databaseService.getTasks().subscribe((tasks: Item[]) => {
      this.todoItems = tasks;
    });
  }

  onAddTask() {
    if (this.taskInput.trim() === '') {
      return;
    }
    const newItem = new Item(this.taskInput, false);
    this.todoItems.push(newItem);
    this.databaseService.postTasks(newItem);
    // console.log(this.todoItems);
    this.taskInput = '';
    console.log(this.databaseService.todoItems);
  }
}
