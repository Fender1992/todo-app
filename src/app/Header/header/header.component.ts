import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from 'src/app/Model/items.model';
import { CalenderService } from 'src/app/Services/calender.service';
import { DateService } from 'src/app/Services/date.service';
import { HandleItems } from 'src/app/Services/handleItems.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [DateService, HandleItems],
})
export class HeaderComponent implements OnInit {
  currentDate: any;
  @Output() taskAdded = new EventEmitter<Item>();
  taskInput: string = '';
  @Input('previosDays') daysArray: CalenderService[] = [];
  constructor(
    private dateService: DateService,
    private handleItems: HandleItems
  ) {}
  ngOnInit() {
    this.currentDate = this.dateService.date;
  }
  onAddTask() {
    this.taskAdded.emit(new Item(this.taskInput, false, Date()));
    this.taskInput = '';
  }
}
