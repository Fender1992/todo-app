import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HandleItems } from '../services/handleItems.service';
import { Item } from '../model/items.model';
import { DatabaseService } from '../services/database.service';
import { DateService } from '../services/date.service';
import { Store } from '@ngrx/store';

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
    private dateService: DateService,
    private store: Store
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
