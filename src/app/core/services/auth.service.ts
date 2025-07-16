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
    console.log('Starting registration process:', data);
    return this.http
      .post<User>(`${this.apiUrl}/register`, data)
      .pipe(
        tap({
          next: (response) => {
            console.log('Registration successful:', response);
            // Don't automatically try to login
          },
          error: (error) => {
            console.error('Registration error:', error);
            throw error; // Re-throw to be caught by the component
          }
        })
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
