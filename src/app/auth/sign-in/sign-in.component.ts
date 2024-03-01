import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { errorObject } from 'rxjs/internal-compatibility';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  isLoginMode = true;
  error: string = 'An error occured';
  ngOnInit() {}

  constructor(private router: Router, private authService: AuthService) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onLogin(form: NgForm) {
    if (!form.valid) {
      return;
    } else {
      this.router.navigate(['/main-list']);
    }
    const email = form.value.email;
    const password = form.value.password;

    if (this.isLoginMode) {
      //...
    } else {
      this.authService.signUp(email, password).subscribe(
        (resData) => {
          console.log(resData);
        },
        (errorRes) => {
          console.log(errorRes);
          switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
              this.error = 'this email exists already';
          }
        }
      );
    }

    form.reset();
  }
}
