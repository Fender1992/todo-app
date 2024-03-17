import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { HeaderComponent } from './Header/header/header.component';
import { TodoListComponent } from './Todo-list/todo-list.component';
import { MainComponent } from './main/main.component';
import { FormsModule } from '@angular/forms';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { LoadingSpinner } from 'src/shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { DatabaseService } from './services/database.service';
import { AuthService } from './services/auth.service';
import { DateService } from './services/date.service';
import { AlertComponent } from './alert/alert.component';
import { CompletedComponent } from './Completed/completed.component';
import { AppRoutingModule } from './app-routing.module';
import { taskReducer } from './store/tasks.reducer';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TodoListComponent,
    SignInComponent,
    MainComponent,
    LoadingSpinner,
    AlertComponent,
    CompletedComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({
      tasks: taskReducer,
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    DatabaseService,
    AuthService,
    DateService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
