import { Component } from '@angular/core';
import { MenuSidebar } from '../menu-sidebar/menu-sidebar';

@Component({
  selector: 'app-service-orders',
  imports: [
    MenuSidebar
  ],
  templateUrl: './service-orders.html',
  styleUrl: './service-orders.css',
})
export class ServiceOrders {}
