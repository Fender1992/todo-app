import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from 'src/app/Model/items.model';
import { DateService } from 'src/app/Services/date.service';
import { HandleItems } from 'src/app/Services/handleItems.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [DateService, HandleItems],
})
export class HeaderComponent implements OnInit {
  @Input() currentDate: any;
  @Input() todoItems: Item[] = [];
  @Input() taskInput: string = '';
  constructor(
    private dateService: DateService,
    private handleItems: HandleItems
  ) {}
  ngOnInit() {
    this.currentDate = this.dateService.date;
    this.todoItems = this.handleItems.item;
  }

  taskAdded() {
    // console.log(event.target.value);
    // this.taskInput = event.target.value;
    this.todoItems.push(new Item(this.taskInput));
    console.log(this.todoItems);
    this.taskInput = '';
  }
}
