import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ingredients-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './ingredients-page.component.html',
  styleUrl: './ingredients-page.component.css'
})
export class IngredientsPageComponent {

  constructor(private router: Router) {
  }
  
  ingredientInput = ''; 
  quantityInput = '';//default vars for input
  quantityType = '';

  addIngredient() {
    //display input fields
      //name, quantity, drop down quantity-type
      //access name field, quantity field, drop down value
      //ensure non-null and valid input
      const ingredient = {
        name: this.ingredientInput, // Get from the form input
        quantity: this.quantityInput, // Get from the form input
        quantityType: this.quantityType
      };
     /* if (ingredient.name == null) {

      }*/
      console.log(
        "ingredient name: " + ingredient.name + 
        "\nquantity: " + ingredient.quantity + 
        "\nquantity type: " + ingredient.quantityType
      )
  }

  generateRecipes() {
    this.router.navigate(['/ingredientsPage']);
    console.log("ingredient button pushed");
  }
}
