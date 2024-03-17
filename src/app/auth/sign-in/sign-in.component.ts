import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { errorObject } from 'rxjs/internal-compatibility';
import { AuthData, AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = '';
  ngOnInit() {}

  constructor(private router: Router, private authService: AuthService) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onLogin(form: NgForm) {
    if (!form.valid) {
      return;
    } else {
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }

    authObs.subscribe(
      (resData) => {
        this.isLoading = false;
        this.router.navigate(['/main-list']);
      },
      (errMessage) => {
        this.error = errMessage;
        console.log(this.error);
        this.isLoading = false;
      }
    );

    form.reset();
  }

  onHandleError() {
    this.error = '';
  }
}
