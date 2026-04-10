import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginData = { username: '', password: '' };
  message = '';

  constructor(private authService: AuthService) {}

  onLogin() {
    this.authService.login(this.loginData).subscribe({
      next: (token) => {
        this.message = "Login Successful! Token saved.";
        console.log('JWT Token:', token);
      },
      error: (err) => {
        this.message = "Error: " + err.error;
      }
    });
  }
}
