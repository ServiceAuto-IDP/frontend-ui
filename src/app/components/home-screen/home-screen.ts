import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VehicleService } from '../../services/vehicle.service';
import { MenuSidebar } from '../menu-sidebar/menu-sidebar';
import { AuthService } from '../../services/auth.service';
import { ServiceRequestService } from '../../services/service-request.service';
import { VehicleModel } from '../../models/vehicle.model';

@Component({
  selector: 'app-home-screen',
  imports: [
    ReactiveFormsModule,
    MenuSidebar
  ],
  templateUrl: './home-screen.html',
  styleUrl: './home-screen.css',
})
export class HomeScreen implements OnInit {
  displayVehicleDialog: boolean = false;
  isSubmitting: boolean = false;
  vehicleForm: FormGroup;

  username: string | null = '';

  showServiceForm: boolean = false;
  userVehicles: any[] = [];
  serviceOrderForm: FormGroup;
  todayDate: string = new Date().toISOString().split('T')[0];

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private vehicleService: VehicleService,
              private serviceRequestService: ServiceRequestService) {
    this.vehicleForm = this.fb.group({
      licensePlate: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      model: ['', [Validators.required]]
    });

    this.serviceOrderForm = this.fb.group({
      vehicleId: [null, Validators.required],
      serviceType: ['', Validators.required],
      startDate: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.authService.currentUser$.subscribe(name => {
      this.username = name;
    });
  }

  showDialog() {
    this.displayVehicleDialog = true;
  }

  closeDialog() {
    this.displayVehicleDialog = false;
    this.vehicleForm.reset();
  }

  isFieldInvalid(field: string): boolean {
    const control = this.vehicleForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  getFieldError(field: string): string {
    return 'This field is required';
  }

  onOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('dialog-overlay')) {
      this.closeDialog();
      this.closeServiceDialog();
    }
  }

  onSubmit() {
    if (this.vehicleForm.valid) {
      this.isSubmitting = true;

      const vehicleData: VehicleModel = this.vehicleForm.value;

      this.vehicleService.registerVehicle(vehicleData).subscribe({
        next: (response) => {
          this.userVehicles.push(response);

          this.closeDialog();
          this.isSubmitting = false;
        },
        error: (err) => {
          console.error('Registration failed', err);
          this.isSubmitting = false;
        }
      });
    }
  }

  openServiceOrder() {
    this.showServiceForm = true;
    // this.vehicleService.getVehiclesForUser().subscribe(vehicles => {
    //   this.userVehicles = vehicles;
    //   this.showServiceForm = true;
    // });
  }

  onServiceSubmit() {
    this.showServiceForm = false;
    // if (this.serviceOrderForm.valid) {
    //   this.serviceRequestService.createRequest(this.serviceOrderForm.value).subscribe(() => {
    //     this.showServiceForm = false;
    //   });
    // }
  }

  closeServiceDialog() {
    this.showServiceForm = false;
    this.serviceOrderForm.reset({ vehicleId: null, serviceType: '' });
  }

  isServiceFieldInvalid(field: string): boolean {
    const control = this.serviceOrderForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
