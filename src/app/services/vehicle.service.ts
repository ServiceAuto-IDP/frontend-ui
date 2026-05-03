import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VehicleModel } from '../models/vehicle.model';

@Injectable({ providedIn: 'root' })
export class VehicleService {
  private apiUrl = 'http://localhost:8000/api/client/vehicles';

  constructor(private http: HttpClient) {}

  registerVehicle(vehicleData: VehicleModel): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(this.apiUrl, vehicleData, { headers });
  }

  getVehiclesForUser(): Observable<VehicleModel[]> {
    return this.http.get<VehicleModel[]>(this.apiUrl);
  }
}
