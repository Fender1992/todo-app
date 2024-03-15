import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { CompletedComponent } from './Completed/completed.component';
import { MainComponent } from './Main/main.component';
import { canActivate as AuthGuard } from './auth/sign-in/auth.guard';

const appRoutes: Routes = [
  { path: '', component: SignInComponent },
  { path: 'main-list', canActivate: [AuthGuard], component: MainComponent },
  {
    path: 'completed',
    canActivate: [AuthGuard],
    component: CompletedComponent,
  },
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
