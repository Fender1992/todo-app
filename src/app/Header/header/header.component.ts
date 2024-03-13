import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Item } from 'src/app/Model/items.model';
import { AuthService } from 'src/app/Services/auth.service';
import { DateService } from 'src/app/Services/date.service';
import { HandleItems } from 'src/app/Services/handleItems.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [DateService, HandleItems],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private userSub!: Subscription;
  currentDate: any;
  @Output() taskAdded = new EventEmitter<Item>();
  taskInput: string = '';

  constructor(
    private dateService: DateService,
    // private handleItems: HandleItems,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
    });
    this.currentDate = this.dateService.date;
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
  // onAddTask() {
  //   this.taskAdded.emit(new Item(this.taskInput, false, Date()));
  //   this.taskInput = '';
  // }
  onLogout() {
    this.authService.logout();
  }
}
