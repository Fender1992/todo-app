import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './Header/header/header.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { MainComponent } from './main/main.component';
import { FormsModule } from '@angular/forms';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { RouterModule, Routes } from '@angular/router';
import { LoadingSpinner } from 'src/shared/loading-spinner/loading-spinner.component';
import { AuthInterceptorService } from './Services/auth-interceptor.service';
import { DatabaseService } from './Services/database.service';
import { AuthService } from './Services/auth.service';
import { DateService } from './Services/date.service';
import { AuthGuard } from './auth/sign-in/auth.guard';
import { AlertComponent } from './alert/alert.component';

const appRoutes: Routes = [
  { path: '', component: SignInComponent },
  { path: 'main-list', component: MainComponent },
  // { canActivate: [AuthGuard] },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TodoListComponent,
    SignInComponent,
    MainComponent,
    LoadingSpinner,
    AlertComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
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
