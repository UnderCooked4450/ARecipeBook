import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private baseUrl = '`https://www.allrecipes.com`'; // Adjust to your API endpoint

  constructor(private http: HttpClient) {}

  getRecipes(query: string): Observable<any[]> {
    // Assuming your API has a /search endpoint that accepts a query parameter
    return this.http.get<any[]>(`${this.baseUrl}/search?q=/${query}`);
  }
}
