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
  quantityInput = 0;//default vars for input
  quantityType = '';

  ingredientValid = true;

  addIngredient() {
      //access name field, quantity field, drop down value
      const ingredient = {
        name: this.ingredientInput,
        quantity: this.quantityInput, // Get from the form input
        quantityType: this.quantityType
      };
      //validate input
      this.ingredientValid = this.validateInput(ingredient.name, ingredient.quantity, ingredient.quantityType)

//should we add more quantity types (ml, g, etc.) and automatic type conversion?


      if (this.ingredientValid) {
        console.log(
          "ingredient name: " + ingredient.name + 
          "\nquantity: " + ingredient.quantity + 
          "\nquantity type: " + ingredient.quantityType
        )
      }
  }

  validateInput(ingredientName: string, quantity: number, quantityType: string) {
    if (ingredientName.length == 0) {
      alert("Ingredient Name cannot be empty")
      return false;
    }
    else if (ingredientName.length > 20) {
      alert("Ingredient Name cannot exceed 20 characters")
      return false;
    }
    //check for empty characters in name?
    else if (quantity <= 0) {
      alert("Quantity must be greater than 0")
      return false;
    }
    else if (quantity >= 1000) {
      alert("Quantity must be less than 1000")//better suggestions for 1000?
      return false;
    }
    else if (quantityType.length == 0) {
      alert("Quantity Type must be selected")
      return false;
    }
    return true;
  }

  generateRecipes() {
    this.router.navigate(['/ingredientsPage']);
    console.log("ingredient button pushed");
  }
}
