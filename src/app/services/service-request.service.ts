import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VehicleModel } from '../models/vehicle.model';
import { ServiceRequestModel } from '../models/service-request.model';

@Injectable({ providedIn: 'root' })
export class ServiceRequestService {
  private apiUrl = 'http://localhost:8080/api/client/requests';

  constructor(private http: HttpClient) {}

  createRequest(requestData: ServiceRequestModel): Observable<any> {
    return this.http.post(this.apiUrl, requestData);
  }

  getRequestsForUser(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
