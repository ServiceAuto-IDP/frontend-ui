import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MenuSidebar } from '../menu-sidebar/menu-sidebar';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { VehicleService } from '../../services/vehicle.service';
import { ServiceRequestService } from '../../services/service-request.service';
import { DatePipe, TitleCasePipe, LowerCasePipe } from '@angular/common';

@Component({
  selector: 'app-service-orders',
  standalone: true,
  imports: [
    MenuSidebar,
    FormsModule,
    ReactiveFormsModule,
    DatePipe,
    TitleCasePipe
  ],
  templateUrl: './service-orders.html',
  styleUrl: './service-orders.css',
})
export class ServiceOrders implements OnInit {
  isSubmitting = false;
  showServiceForm = false;
  userVehicles: any[] = [];
  ongoingRequests: any[] = [];
  completedRequests: any[] = [];

  serviceOrderForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehicleService,
    private serviceRequestService: ServiceRequestService,
    private cdr: ChangeDetectorRef,
  ) {
    this.serviceOrderForm = this.fb.group({
      vehicleId: [null, Validators.required],
      category: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit() {
    this.loadInitialData();
  }

  loadInitialData() {
    this.vehicleService.getVehiclesForUser().subscribe({
      next: (vehicles) => {
        this.userVehicles = vehicles
        this.loadRequests();
      },
      error: (err) => console.error('Error fetching vehicles', err)
    });

    this.loadRequests();
  }

  loadRequests() {
    this.serviceRequestService.getUserRequests().subscribe({
      next: (requests) => {
        const mappedRequests = requests.map(r => {
          const vehicle = this.userVehicles.find(v => v.id === r.vehicleId);

          return {
            ...r,
            licensePlate: vehicle ? vehicle.licensePlate : 'Loading...'
          };
        });

        this.ongoingRequests = mappedRequests.filter(r => r.status.toUpperCase() !== 'COMPLETED');
        this.completedRequests = mappedRequests.filter(r => r.status.toUpperCase() === 'COMPLETED');

        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error fetching requests', err)
    });
  }

  showDialog() {
    this.showServiceForm = true;
  }

  closeServiceDialog() {
    this.showServiceForm = false;
    this.serviceOrderForm.reset({ vehicleId: null, category: '' });
  }

  onOverlayClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('dialog-overlay')) {
      this.closeServiceDialog();
    }
  }

  onServiceSubmit() {
    if (this.serviceOrderForm.valid) {
      this.isSubmitting = true;

      this.serviceRequestService.createRequest(this.serviceOrderForm.value).subscribe({
        next: () => {
          this.isSubmitting = false;
          this.closeServiceDialog();
          this.loadRequests();
        },
        error: (err) => {
          this.isSubmitting = false;
          console.error('Booking failed', err);
        }
      });
    }
  }

  isServiceFieldInvalid(field: string): boolean {
    const control = this.serviceOrderForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
