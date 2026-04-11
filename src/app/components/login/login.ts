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

    this.authService.login(this.userData).subscribe({
      next: (response) => {
        console.log('User logged in!', response);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.errorMessage = "Login failed.";
      }
    });
  }
}
