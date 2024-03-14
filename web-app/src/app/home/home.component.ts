import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  selectedIngredients: string = '';
  recipeLinks: Array<{ title: string, url: string }> = [];

  constructor(private authService: AuthService, private router: Router) {}
  
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
  searchrecipe() {
    this.authService.searchRecipes([this.selectedIngredients]).subscribe({
      next: (links) => {
        this.recipeLinks = links;
      },
      error: (error) => {
        console.error('Search error:', error);
      }
    });
  }
  camera() {
    this.router.navigate(['/camera']);
  }
}
