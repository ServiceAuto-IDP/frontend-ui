import { Component } from '@angular/core';
import { MenuSidebar } from '../menu-sidebar/menu-sidebar';

@Component({
  selector: 'app-my-garage',
  imports: [
    MenuSidebar
  ],
  templateUrl: './my-garage.html',
  styleUrl: './my-garage.css',
})
export class MyGarage {}
