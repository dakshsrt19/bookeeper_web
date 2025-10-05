import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],  // plural here
})
export class Login {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  router = inject(Router);
  authService = inject(AuthService);


  onLogin(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Email and password are required.';
      return;
    }

    this.errorMessage = '';
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        console.log('Login success, navigating to dashboard...');
        this.router.navigate(['/dashboard']);
      },
      error: (err: { error: string }) => {
        this.errorMessage = err?.error || 'Login failed';
      }
    });
  }
}
