import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { RegisterRequest } from '../core/model/auth.models';

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
      userName: ['', Validators.required],  // This will be mapped to username
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      street: ['', Validators.required],
      houseNumber: ['', Validators.required],
      postalCode: ['', Validators.required], // This will be mapped to postCode
      city: ['', Validators.required]
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
      const formData = this.registerForm.value;

      const registerRequest: RegisterRequest = {
        username: formData.userName,
        password: formData.password,
        email: formData.email,
        phone: formData.phone,
        role: 'client',
        firstName: formData.firstName,
        lastName: formData.lastName,
        houseNumber: formData.houseNumber,
        street: formData.street,
        postCode: formData.postalCode,
        city: formData.city
      };

      this.authService.register(registerRequest).subscribe({
        next: (response) => {
          console.log('Registration successful:', response);
          // Show success message to user
          alert('Registration successful! Please login.');
          // Switch to login form
          this.showSignIn();
          // Pre-fill the login form
          this.loginForm.patchValue({
            email: registerRequest.email,
            password: registerRequest.password
          });
        },
        error: (error) => {
          console.error('Registration failed:', error);
          // Show error message to user
          alert('Registration failed. Please try again.');
        }
      });
    }
  }

  private loginAfterRegistration(email: string, password: string) {
    this.authService.login({ email, password }).subscribe({
      next: (response) => {
        console.log('Auto-login successful:', response);
        // Handle successful login (redirect, etc.)
      },
      error: (error) => {
        console.error('Auto-login failed:', error);
      }
    });
  }

  redirectUser() {
    const user = this.authService.getCurrentUser();
    if (!user) return;

    if (user.role === 'admin') this.router.navigate(['/dashboard']);
    else if (user.role === 'client') this.router.navigate(['/requests/create']);
    else this.router.navigate(['/dashboard']);
  }
}
