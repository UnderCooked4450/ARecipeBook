import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  searchInput: string = 'beef';
  apiKey: string = 'a0c0c92106a74b308374f32d0c0d4a3c';
  recipe: any;
  searchQuery: string = '';
  
  recipes: any[] = [];


  constructor(private authService: AuthService, private router: Router, private http: HttpClient) {}
  
  logout() {
    this.authService.logout().subscribe({
      next: value => {
        // If logout is successful, navigate to the login page
        this.router.navigate(['/login']);
      },
      error: error => {
        console.error('Logout error:', error);
        // Handle logout error
      }
    });
  }

  //implement webscraper
  searchRecipes(): void {
    this.http.get<any[]>(`http://localhost:3000/search_recipes?q=${this.searchQuery}`).subscribe({
      next: (data) => {
        this.recipes = data;  
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }
  



  // searchRecipes(): void {
  //   const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${this.searchInput}&apiKey=${this.apiKey}`;
    
  //   this.http.get<any[]>(url)
  //     .subscribe(
  //       data => {
  //         this.recipes = data;
  //       },
  //       error => {
  //         if(error.status ===401){
  //           console.error("unauthorizeed request. Please check your API key");
    
  //         }else{
  //         console.error('Error fetching data:', error);
  //       }
  //       }
  //     );
  // }
  navigateToIngredients() {
    this.router.navigate(['/ingredients']);
  }
  
}
