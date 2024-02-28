import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ingredients-page',
  standalone: true,
  imports: [],
  templateUrl: './ingredients-page.component.html',
  styleUrl: './ingredients-page.component.css'
})
export class IngredientsPageComponent {

  constructor(private router: Router) {
  }
  

  generateRecipes() {
    this.router.navigate(['/ingredientsPage']);
    console.log("ingredient button pushed");
  }
}
