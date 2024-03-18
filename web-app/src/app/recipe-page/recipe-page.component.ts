import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-page.component.html',
  styleUrl: './recipe-page.component.css'
})
export class RecipePageComponent implements OnInit {

  recipes: Array<{ title: string, url: string }> = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
   
    this.recipes = this.authService.getRecipes(); 


    // Remove the first link from the array
    if (this.recipes.length > 0) {
      this.recipes.shift(); // Removes the first element from the array
    }
  }

  backButton(): void {
    // Reset recipes array
    this.recipes = [];
    // Navigate back to the ingredients-list page
    this.router.navigate(['/ingredientsPage']);
  }
}
