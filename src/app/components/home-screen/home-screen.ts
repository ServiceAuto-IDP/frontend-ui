import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VehicleService } from '../../services/vehicle.service';

@Component({
  selector: 'app-home-screen',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './home-screen.html',
  styleUrl: './home-screen.css',
})
export class HomeScreen {
  displayVehicleDialog: boolean = false;
  isSubmitting: boolean = false;
  vehicleForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.vehicleForm = this.fb.group({
      licensePlate: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      model: ['', [Validators.required]]
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

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('dialog-overlay')) {
      this.closeDialog();
    }
  }

  onSubmit() {
    if (this.vehicleForm.valid) {
      this.isSubmitting = true;
      console.log(this.vehicleForm.value);
    }
  }
}
