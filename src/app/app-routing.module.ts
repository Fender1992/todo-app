import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { CompletedComponent } from './Completed/completed.component';
import { MainComponent } from './main/main.component';
import { canActivate as AuthGuard } from './auth/sign-in/auth.guard';

const appRoutes: Routes = [
  { path: '', component: SignInComponent },
  { path: 'main-list', component: MainComponent, canActivate: [AuthGuard] },
  {
    path: 'completed',
    component: CompletedComponent,
    canActivate: [AuthGuard],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
