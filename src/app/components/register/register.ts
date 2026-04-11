import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

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
  isRegistered = false;

  constructor(private authService: AuthService, private cdr: ChangeDetectorRef) { }

  onRegister() {
    if (!this.userData.username || !this.userData.password) {
      this.errorMessage = "Please fill in all fields.";
      return;
    }

    if (this.userData.password !== this.confirmPassword) {
      this.errorMessage = "Passwords do not match!";
      return;
    }

    this.authService.register(this.userData).subscribe({
      next: (response) => {
        this.isRegistered = true;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = "Registration failed. Username might be taken.";
      }
    });
  }
}
