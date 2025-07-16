import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  isSignUpActive = false;

  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      street: ['', Validators.required],
      houseNumber: ['', Validators.required],
      postalCode: ['', Validators.required],
      city: ['', Validators.required],
    });
  }

  showSignUp() {
    this.isSignUpActive = true;
  }

  showSignIn() {
    this.isSignUpActive = false;
  }

  onLoginSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: () => this.redirectUser(),
        error: (err) => console.error('Login Fehler', err),
      });
    }
  }

  onRegisterSubmit() {
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: () => this.redirectUser(),
        error: (err) => console.error('Registrierung Fehler', err),
      });
    }
  }

  redirectUser() {
    const user = this.authService.getCurrentUser();
    if (!user) return;

    if (user.role === 'admin') this.router.navigate(['/dashboard']);
    else if (user.role === 'client') this.router.navigate(['/requests/create']);
    else this.router.navigate(['/dashboard']);
  }
}
