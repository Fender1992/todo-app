import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HandleItems } from '../Services/handleItems.service';
import { Item } from '../Model/items.model';
import { DatabaseService } from '../Services/database.service';
import { DateService } from '../Services/date.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  providers: [HandleItems],
})
export class TodoListComponent implements OnInit {
  @Input('todo-component-list') todoItems: Item[] = [];
  @Input('task-completed') completed: boolean = false;
  @Output() deleteTask = new EventEmitter<string>();
  @Output() completedTask = new EventEmitter<Item>();
  currentDate: any;

  constructor(
    private handleItems: HandleItems,
    private databaseService: DatabaseService,
    private dateService: DateService
  ) {}

  ngOnInit() {
    this.currentDate = this.dateService.date;
    this.todoItems = this.handleItems.item;
    this.databaseService.getTasks().subscribe((tasks: Item[]) => {
      this.todoItems = tasks;
    });
  }

  @Input() onDeleteTask(item: Item) {
    this.deleteTask.emit(item.firebaseKey);
    this.completedTask.emit(item);
    // this.completedTask.push(item.task);
    console.log(this.completedTask);
  }
}
