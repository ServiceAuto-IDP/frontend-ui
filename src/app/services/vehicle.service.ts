import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VehicleService {
  private apiUrl = 'http://localhost:8080/api/client/vehicles';

  constructor(private http: HttpClient) {}

  registerVehicle(vehicleData: any): Observable<any> {
    return this.http.post(this.apiUrl, vehicleData);
  }
}
