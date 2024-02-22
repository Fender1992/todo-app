import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HandleItems } from '../Services/handleItems.service';
import { Item } from '../Model/items.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  providers: [HandleItems],
})
export class TodoListComponent implements OnInit {
  @Input('todo-component-list') todoItems: Item[] = [];
  ngOnInit() {}
  @Input('todo-list-completed') completed: boolean = false;
  @Output() deleteTask = new EventEmitter<string>();

  constructor(private handleItems: HandleItems) {}

  onDeleteTask(firebaseKey: string) {
    this.deleteTask.emit(firebaseKey);
  }
}
