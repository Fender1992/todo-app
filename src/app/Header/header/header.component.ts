import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
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
  completed: boolean = false;

  constructor(
    private dateService: DateService,
    // private handleItems: HandleItems,
    private authService: AuthService,
    private router: Router
  ) {}
  ngOnInit() {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user && !!user.token;
    });
    this.currentDate = this.dateService.date;
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }
  // onAddTask() {
  //   this.taskAdded.emit(new Item(this.taskInput, false, Date()));
  //   this.taskInput = '';
  // }
  onLogout() {
    this.authService.logout();
    this.router.navigate(['']);
  }
  onCompleted() {
    this.router.navigate(['/completed']);
  }
}
