import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../auth/sign-in/user.model';
import { Router } from '@angular/router';

export interface AuthData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(new User('', '', '', new Date()));
  private tokenExprTimer: any;
  authToken: string = '';
  authUUID: string = '';

  constructor(private http: HttpClient, private router: Router) {}
  signUp(email: string, password: string) {
    return this.http
      .post<AuthData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCl2E-Qmu4fOYNl_ZppPdgB7PECzwzpC6w',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuth(
            resData.email,
            resData.idToken,
            resData.localId,
            +resData.expiresIn
          );
        })
      );
  }
  login(email: string, password: string) {
    return this.http
      .post<AuthData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCl2E-Qmu4fOYNl_ZppPdgB7PECzwzpC6w',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuth(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
          this.authUUID = resData.localId;
          // console.log(resData.localId);
        })
      );
  }
  autoLogin() {
    const userDataString: string | null = localStorage.getItem('userData');
    if (userDataString !== null) {
      const userData: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate: string;
      } = JSON.parse(userDataString);
      const loadUser = new User(
        userData.email,
        userData._token,
        userData.id,
        new Date(userData._tokenExpirationDate)
      );

      if (loadUser.token) {
        this.user.next(loadUser);
        const expDuration =
          new Date(userData._tokenExpirationDate).getTime() -
          new Date().getTime();
        this.autoLogout(expDuration);
      }
      this.authToken = userData._token;
    }
  }

  logout() {
    this.user.next(new User('', '', '', new Date()));
    this.router.navigate(['/']);
    localStorage.removeItem('userData');
    if (this.tokenExprTimer) {
      clearTimeout(this.tokenExprTimer);
    }
    this.tokenExprTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExprTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }
  private handleAuth(
    email: string,
    token: string,
    userId: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);

    this.authUUID = this.authToken;

    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errMessage = 'An unknown error occured!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errMessage = 'This email does not exist!';
        break;
      case 'INVALID_PASSWORD':
        errMessage = 'This password is not correct';
        break;
    }
    return throwError(errMessage);
  }
}
// AuthService;
