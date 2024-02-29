import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './Header/header/header.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { HandleTodoItemComponent } from './handle-todo-item/handle-todo-item.component';
import { MainComponent } from './main/main.component';
import { FormsModule } from '@angular/forms';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', component: SignInComponent },
  { path: 'main-list', component: MainComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TodoListComponent,
    HandleTodoItemComponent,
    SignInComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
