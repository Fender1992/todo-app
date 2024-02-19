import { Component, OnInit } from '@angular/core';
import { DateService } from 'src/app/Services/date.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [DateService],
})
export class HeaderComponent implements OnInit {
  currentDate: any;
  constructor(private dateService: DateService) {}
  ngOnInit() {
    this.currentDate = this.dateService.date;
  }

  addTask(event: any) {}
}
