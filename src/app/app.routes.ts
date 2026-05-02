import { Routes } from '@angular/router';
import { HomeScreen } from './components/home-screen/home-screen';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { LandingPage } from './components/landing-page/landing-page';
import { MyGarage } from './components/my-garage/my-garage';
import { ServiceOrders } from './components/service-orders/service-orders';

export const routes: Routes = [
  { path: '', component: LandingPage },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'home', component: HomeScreen },
  { path: 'my-garage', component: MyGarage },
  { path: 'service-orders', component: ServiceOrders },
];
