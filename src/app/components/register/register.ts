import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  @Output() switchToLogin = new EventEmitter<void>();

  goToLogin() {
    this.switchToLogin.emit();
  }

  userData = { username: '', password: '' };
  confirmPassword = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    // 1. Basic Validation
    if (!this.userData.username || !this.userData.password) {
      this.errorMessage = "Please fill in all fields.";
      return;
    }

    // 2. Check if passwords match
    if (this.userData.password !== this.confirmPassword) {
      this.errorMessage = "Passwords do not match!";
      return;
    }

    // 3. Send to Backend
    this.authService.register(this.userData).subscribe({
      next: (response) => {
        console.log('User registered!', response);
        this.router.navigate(['/login']); // Redirect to login on success
      },
      error: (err) => {
        this.errorMessage = "Registration failed. Username might be taken.";
      }
    });
  }
}
