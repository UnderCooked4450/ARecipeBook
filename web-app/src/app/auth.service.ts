// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../app/environment'; 

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  signUp(user: { email: string; password: string; confirmPassword: string;}): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, user);
  }
}
