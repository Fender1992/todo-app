import { Component } from '@angular/core';
import { DateService } from './Services/date.service';
import { HandleItems } from './Services/handleItems.service';
import { Item } from './Model/items.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DateService, HandleItems],
})
export class AppComponent {
  currentDate: any;
  todoItems: Item[] = [];
  taskInput: string = '';
  constructor(
    private dateService: DateService,
    private handleItems: HandleItems
  ) {}
  ngOnInit() {
    this.currentDate = this.dateService.date;
    this.todoItems = this.handleItems.item;
  }

  onAddTask(event: Item) {
    // console.log(event.target.value);
    // this.taskInput = event.target.value;
    this.todoItems.push(new Item(event.task));
    console.log(this.todoItems);
    this.taskInput = '';
  }
}
