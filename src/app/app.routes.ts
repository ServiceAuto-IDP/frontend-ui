import { Routes } from '@angular/router';
import { HomeScreen } from './components/home-screen/home-screen';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { LandingPage } from './components/landing-page/landing-page';

export const routes: Routes = [
  { path: '', component: LandingPage },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'home', component: HomeScreen }
];
