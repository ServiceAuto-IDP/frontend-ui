import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Register } from '../register/register';
import { Login } from '../login/login';

@Component({
  selector: 'app-landing-page',
  imports: [
    FormsModule,
    Register,
    Login
  ],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.css',
})
export class LandingPage {
  viewMode: 'buttons' | 'login' | 'register' = 'buttons';

  setMode(mode: 'buttons' | 'login' | 'register') {
    this.viewMode = mode;
  }
}
