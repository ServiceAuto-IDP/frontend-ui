import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MenuSidebar } from '../menu-sidebar/menu-sidebar';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { VehicleService } from '../../services/vehicle.service';
import { ServiceRequestService } from '../../services/service-request.service';
import { VehicleModel } from '../../models/vehicle.model';

@Component({
  selector: 'app-my-garage',
  imports: [
    MenuSidebar,
    ReactiveFormsModule
  ],
  templateUrl: './my-garage.html',
  styleUrl: './my-garage.css',
})
export class MyGarage implements OnInit {
  displayVehicleDialog: boolean = false;
  isSubmitting: boolean = false;
  vehicleForm: FormGroup;

  username: string | null = '';

  userVehicles: VehicleModel[] = [];

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private vehicleService: VehicleService,
              private cdr: ChangeDetectorRef) {
    this.vehicleForm = this.fb.group({
      licensePlate: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      model: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.authService.currentUser$.subscribe(name => {
      this.username = name;
    });

    this.vehicleService.getVehiclesForUser().subscribe(vehicles => {
      this.userVehicles = vehicles;
      this.cdr.detectChanges();
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
}

