import { Component, EventEmitter, model, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  @Output() switchToRegister = new EventEmitter<void>();

  goToRegister() {
    this.switchToRegister.emit();
  }

  userData = { username: '', password: '' };
  confirmPassword = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
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
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = "Registration failed. Username might be taken.";
      }
    });
  }
}
