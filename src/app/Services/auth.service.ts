import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface AuthData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}
  signUp(email: string, password: string) {
    return this.http.post<AuthData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCl2E-Qmu4fOYNl_ZppPdgB7PECzwzpC6w',
      {
        email: email,
        password: password,
        returnSecureToken: true,
      }
    );
  }
}
