import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/user';

  private jwtHelper = new JwtHelperService();

  private currentUserSubject = new BehaviorSubject<string | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.extractUserFromToken();
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user, { responseType: 'text' });
  }

  login(credentials: any): Observable<string> {
    return this.http.post(`${this.apiUrl}/login`, credentials, { responseType: 'text' })
      .pipe(
        tap(token => {
          this.setToken(token);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
  }

  public extractUserFromToken() {
    const token = localStorage.getItem('token');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      const username = decodedToken.sub || decodedToken.username;
      this.currentUserSubject.next(username);
    }
  }

  public setToken(token: string) {
    localStorage.setItem('token', token);
    this.extractUserFromToken();
  }
}
