import { AuthService } from './../services/auth.service';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],  // plural here
})
export class Login implements OnInit {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private authService:AuthService) { }
  ngOnInit() {
    const result = this.authService.getUser();
    console.log('isLoggedIn returned:', result);
  }

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
