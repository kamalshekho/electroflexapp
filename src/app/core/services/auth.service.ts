import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, switchMap } from 'rxjs';
import { User } from '../model/user.model';
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
} from '../model/auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) {}

  login(data: LoginRequest) {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, data)
      .pipe(
        tap((res) => localStorage.setItem('user', JSON.stringify(res.user))),
      );
  }

  register(data: RegisterRequest) {
    return this.http
      .post<User>(`${this.apiUrl}/register`, data)
      .pipe(
        switchMap(() =>
          this.login({ email: data.email, password: data.password }),
        ),
      );
  }

  getCurrentUser(): User | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  logout() {
    localStorage.removeItem('user');
  }
}
