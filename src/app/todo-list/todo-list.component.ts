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
  @Output() taskAdded = new EventEmitter<Item>();
  @Input() todoItems: Item[] = [];
  @Input() taskInput: string = '';
  ngOnInit() {}

  constructor(private handleItems: HandleItems) {
    this.todoItems = this.handleItems.item;
  }
}
