import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-saved-recipes',
  standalone: true,
  imports: [],
  templateUrl: './saved-recipes.component.html',
  styleUrl: './saved-recipes.component.css',
})
export class SavedRecipesComponent {
  constructor(private router: Router) {}

  toggleIngredientList(event: MouseEvent): void {
    const button = event.target as HTMLButtonElement;
    const ingredientList = button.nextElementSibling as HTMLElement;
    ingredientList.classList.toggle('active');
  }

  home() {
    this.router.navigate(['/homepage']);
  }
}
