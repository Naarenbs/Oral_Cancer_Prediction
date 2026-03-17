import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatTabsModule,
  ],
  template: `
    <div class="auth-container">
      <div class="auth-card card">
        <div class="auth-header">
          <h2>Welcome to OralCare AI</h2>
          <p>Secure access for healthcare professionals</p>
        </div>

        <mat-tab-group>
          <!-- Sign In -->
          <mat-tab label="Sign In">
            <div class="tab-content">
              <form (ngSubmit)="signIn()" #signInForm="ngForm">
                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Email</mat-label>
                  <input matInput type="email" [(ngModel)]="signInData.email" name="email" required>
                  <mat-icon matSuffix>email</mat-icon>
                </mat-form-field>

                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Password</mat-label>
                  <input matInput [type]="hideSignInPassword ? 'password' : 'text'"
                         [(ngModel)]="signInData.password" name="password" required>
                  <button mat-icon-button matSuffix type="button"
                          (click)="hideSignInPassword = !hideSignInPassword">
                    <mat-icon>{{hideSignInPassword ? 'visibility_off' : 'visibility'}}</mat-icon>
                  </button>
                </mat-form-field>

                <button type="submit" mat-raised-button color="primary" class="full-width"
                        [disabled]="!signInForm.form.valid">
                  Sign In
                </button>
              </form>
            </div>
          </mat-tab>

          <!-- Sign Up -->
          <mat-tab label="Sign Up">
            <div class="tab-content">
              <form (ngSubmit)="signUp()" #signUpForm="ngForm">
                <div class="form-row">
                  <mat-form-field appearance="outline" class="form-field">
                    <mat-label>First Name</mat-label>
                    <input matInput [(ngModel)]="signUpData.firstName" name="firstName" required>
                  </mat-form-field>

                  <mat-form-field appearance="outline" class="form-field">
                    <mat-label>Last Name</mat-label>
                    <input matInput [(ngModel)]="signUpData.lastName" name="lastName" required>
                  </mat-form-field>
                </div>

                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Email</mat-label>
                  <input matInput type="email" [(ngModel)]="signUpData.email" name="signUpEmail" required>
                </mat-form-field>

                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Password</mat-label>
                  <input matInput [type]="hideSignUpPassword ? 'password' : 'text'"
                         [(ngModel)]="signUpData.password" name="signUpPassword" required minlength="8">
                  <button mat-icon-button matSuffix type="button"
                          (click)="hideSignUpPassword = !hideSignUpPassword">
                    <mat-icon>{{hideSignUpPassword ? 'visibility_off' : 'visibility'}}</mat-icon>
                  </button>
                </mat-form-field>

                <mat-form-field appearance="outline" class="form-field">
                  <mat-label>Confirm Password</mat-label>
                  <input matInput [type]="hideSignUpPassword ? 'password' : 'text'"
                         [(ngModel)]="signUpData.confirmPassword" name="confirmPassword" required>
                </mat-form-field>

                <button type="submit" mat-raised-button color="primary" class="full-width"
                        [disabled]="!signUpForm.form.valid">
                  Create Account
                </button>
              </form>
            </div>
          </mat-tab>
        </mat-tab-group>
      </div>
    </div>
  `,
  styles: [`
    .auth-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .auth-card {
      width: 100%;
      max-width: 500px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
      border-radius: 16px;
      overflow: hidden;
      background: #fff;
    }
    .auth-header {
      text-align: center;
      padding: 32px 32px 0;
    }
    .auth-header h2 {
      font-size: 2rem;
      font-weight: 700;
      margin-bottom: 8px;
    }
    .tab-content {
      padding: 24px;
    }
    .form-field {
      width: 100%;
      margin-bottom: 16px;
    }
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    .form-options {
      margin-bottom: 24px;
      font-size: 14px;
    }
    .checkbox-label {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .full-width {
      width: 100%;
      padding: 12px;
      font-size: 16px;
    }
    @media (max-width: 768px) {
      .form-row {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class AuthComponent {
  
  authService = inject(AuthService);
  router = inject(Router);
  http = inject(HttpClient);
  snackBar = inject(MatSnackBar);
  

  
  private apiUrl = 'http://localhost:3001/api';

  
  hideSignInPassword = true;
  hideSignUpPassword = true;

  signInData = { email: '', password: '' };
  signUpData = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '', agreeToTerms: false };

  
  signIn() {
    const { email, password } = this.signInData;
    this.http.post(`${this.apiUrl}/auth/login`, { email, password }).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        this.authService.login();
        
        const redirectUrl = localStorage.getItem('redirectUrl') || '/ml-model';
        localStorage.removeItem('redirectUrl');
        this.router.navigate([redirectUrl]);
        this.snackBar.open(res.message || 'Login successful', 'Close', { duration: 3000 });
      },
      error: (err) => {
        this.snackBar.open(err.error?.error || 'Login failed', 'Close', { duration: 3000, panelClass: ['error-snackbar'] });
      }
    });
  }

  
  signUp() {
    if (this.signUpData.password !== this.signUpData.confirmPassword) {
      this.snackBar.open('Passwords do not match', 'Close', { duration: 3000 });
      return;
    }

    const { firstName, lastName, email, password } = this.signUpData;
    this.http.post(`${this.apiUrl}/auth/register`, { firstName, lastName, email, password }).subscribe({
      next: (res: any) => {
        this.snackBar.open(res.message || 'Sign up successful', 'Close', { duration: 3000 });
        // Auto sign in
        this.signInData = { email, password };
        this.signIn();
      },
      error: (err) => {
        this.snackBar.open(err.error?.error || 'Sign up failed', 'Close', { duration: 3000 });
      }
    });
  }
}
