import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServiceRequestModel } from '../models/service-request.model';

@Injectable({ providedIn: 'root' })
export class ServiceRequestService {
  private apiUrl = 'http://localhost:8000/api/client/requests';

  constructor(private http: HttpClient) {}

  createRequest(requestData: ServiceRequestModel): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(this.apiUrl, requestData, { headers });
  }

  getUserRequests(): Observable<any[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<any[]>(this.apiUrl, { headers });
  }
}
