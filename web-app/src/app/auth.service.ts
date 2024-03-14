// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../app/environment'; 
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router'; // Import the Router service

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  signUp(user: { email: string; password: string; confirmPassword: string;}): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, user);
  }

  logout(): Observable<any> {
    // You can perform any necessary cleanup here (e.g., clearing tokens, session data, etc.)
    // For now, let's simulate a successful logout
    return of({ success: true }).pipe(
      tap(() => {
        // Redirect the user to the login page after successful logout
        this.router.navigate(['/login']);
      })
    );
  }
  //for recipe searchw

// Inside your recipe service or wherever you make the HTTP call
searchRecipes(ingredients: string[]): Observable<Array<{ title: string, url: string }>> {
  const backendUrl = 'http://localhost:3000/search'; // Backend URL
  return this.http.post<Array<{ title: string, url: string }>>(backendUrl, { ingredients });
}

  
}
