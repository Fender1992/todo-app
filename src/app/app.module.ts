import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './Header/header/header.component';
import { TodoListComponent } from './Todo-list/todo-list.component';
import { MainComponent } from './Main/main.component';
import { FormsModule } from '@angular/forms';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { LoadingSpinner } from 'src/shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './Services/auth-interceptor.service';
import { DatabaseService } from './Services/database.service';
import { AuthService } from './Services/auth.service';
import { DateService } from './Services/date.service';
import { AlertComponent } from './alert/alert.component';
import { CompletedComponent } from './Completed/completed.component';
import { AppRoutingModule } from './app-routing.module';

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
  imports: [BrowserModule, FormsModule, HttpClientModule, AppRoutingModule],
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
