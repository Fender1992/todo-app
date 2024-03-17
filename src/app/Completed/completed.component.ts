import { Component, OnInit } from '@angular/core';
import { Item } from '../model/items.model';

@Component({
  selector: 'app-completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.css'],
})
export class CompletedComponent implements OnInit {
  completed: boolean = true;
  completedList: Item[] = [];

  ngOnInit() {
    console.log(this.completedList);
  }

  onTaskCompleted(item: Item) {
    this.completedList.push(item);
  }
}
