import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-recipe-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-page.component.html',
  styleUrl: './recipe-page.component.css'
})
export class RecipePageComponent implements OnInit {

  recipeLinks: Array<{ title: string, url: string }> = [];

  selectedRecipe: any;

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
  this.recipeLinks = this.authService.getRecipes()
  console.log("Array: ", this.recipeLinks)
  console.log("Length of array passed", this.recipeLinks.length)
  
}


  scrapeRecipe(url: string): void {
    this.authService.scrapeRecipe(url).subscribe({
      next: (recipe: any) => { // Explicitly typing the 'recipe' parameter
        this.selectedRecipe = recipe;
        console.log('Scraped Recipe:', recipe);
      },
      error: (error) => {
        console.error('Error scraping recipe:', error);
      }
    });
  }

  backButton(): void {

    // Clear the selected recipe
    this.selectedRecipe = null;

    // Reset recipes array
    this.recipeLinks = [];
    // Navigate back to the ingredients-list page
    this.router.navigate(['/ingredientsPage']);
  }
}
