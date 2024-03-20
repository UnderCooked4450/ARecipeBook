// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../app/environment'; 
import { tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router'; // Import the Router service

// Define an interface to represent the structure of the scraped data
interface ScrapedData {
  // Define the properties based on the structure of the scraped data
  title: string;
  time: string;
  yields: string;
  ingredients: string[];
  instructions: string;
  nutrients: string;
}



@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiUrl;
  scrapedData: ScrapedData;
  private ingredientNames: string[] = [];
  
  constructor(private http: HttpClient, private router: Router) {
    this.scrapedData = {} as ScrapedData; 
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }

  signUp(user: { email: string; password: string; confirmPassword: string;}): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, user);
  }

  logout(): Observable<any> {
    return of({ success: true }).pipe(
      tap(() => {
        // Redirect the user to the login page after successful logout
        this.router.navigate(['/login']);
      })
    );
  }

searchRecipes(ingredients: string[]): Observable<Array<{ title: string, url: string }>> {
  const backendUrl = 'http://localhost:3000/search'; // Backend URL
  return this.http.post<Array<{ title: string, url: string }>>(backendUrl, { ingredients });
}
generateRecipes(ingredients: string[]): Observable<Array<{ title: string, url: string }>> {
  const backendUrl = 'http://localhost:3000/generateRecipe'; // Backend URL
  return this.http.post<Array<{ title: string, url: string }>>(backendUrl, { ingredients })
}

recipes: { title: string, url: string }[] = [];

setRecipes(recipes: { title: string, url: string }[]): void {
  this.recipes = recipes;
  console.log(recipes); // Checking if recipes are set 
}

getRecipes(): { title: string, url: string }[] {
  return this.recipes; 
}
setIngredientNames(ingredients: string[]): void {
  this.ingredientNames = ingredients;
}

getIngredientNames(): string[] {
  return this.ingredientNames;
}
scrapeRecipe(url: string): Observable<ScrapedData> {
  const backendUrl = 'http://localhost:3000/scrape-recipe'; 
  return this.http.post<ScrapedData>(backendUrl, { url });
}

}
