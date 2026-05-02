import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VehicleModel } from '../models/vehicle.model';

@Injectable({ providedIn: 'root' })
export class VehicleService {
  private apiUrl = 'http://localhost:8080/api/client/vehicles';

  constructor(private http: HttpClient) {}

  registerVehicle(vehicleData: any): Observable<any> {
    return this.http.post(this.apiUrl, vehicleData);
  }

  getVehiclesForUser(): Observable<VehicleModel[]> {
    return this.http.get<VehicleModel[]>(this.apiUrl);
  }
}
