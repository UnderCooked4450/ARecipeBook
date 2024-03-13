import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ingredients-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './ingredients-page.component.html',
  styleUrl: './ingredients-page.component.css'
})
export class IngredientsPageComponent {
  
  ingredientList: {ingredientName: string, quantity: number, quantityType: string}[];
  editedIngredientIndex: number | null = null;
  deletedIngredientIndex: number | null = null;
  

  constructor(private router: Router) {
    this.ingredientList = [];
    console.log(document);
  }
  
  ingredientInput = ''; 
  quantityInput = 0;//default vars for input
  quantityType = '';
  ingredientValid = true;

  addIngredient() {
      //access name field, quantity field, drop down value
      const ingredient = {
        ingredientName: this.ingredientInput,
        quantity: this.quantityInput, // Get from the form input
        quantityType: this.quantityType
      };
      //validate input
      this.ingredientValid = this.validateInput(ingredient.ingredientName, ingredient.quantity, ingredient.quantityType)

      if (this.ingredientValid) {
        if (this.editedIngredientIndex !==null) {
          
            //update existing ingredient
            this.ingredientList[this.editedIngredientIndex] = ingredient;
            //reset value
            this.editedIngredientIndex = null;
          
        } 
        else {
          // Check if the ingredient with the same name and quantityType already exists
          const existingIngredientIndex = this.ingredientList.findIndex(
            (existingIngredient) =>
              existingIngredient.ingredientName === ingredient.ingredientName && existingIngredient.quantityType === ingredient.quantityType
          );
        

          //if found
          if (existingIngredientIndex !== -1) {
            //update quantity
            if (this.ingredientList[existingIngredientIndex].quantity + ingredient.quantity > 5000) {
              alert("Ingredient quantity cannot exceed 5000 total");
            }
            else {
              this.ingredientList[existingIngredientIndex].quantity += ingredient.quantity;
            }
          }
          else {
            //if valid, add ingredient to the list
          this.ingredientList.push(ingredient)
          }

          // Clear input fields after adding/updating the ingredient
          /*
          this.ingredientInput = '';
          this.quantityInput = 0;
          this.quantityType = '';
          //*/
          
          //redraw the table of ingredients
          //happens automatically thanks to 2 way data binding in angular
      }
    }
  }

  //pretty self explanantory
  validateInput(ingredientName: string, quantity: number, quantityType: string) {
    if (ingredientName.length == 0) {
      alert("Ingredient Name cannot be empty")
      return false;
    }
    else if (ingredientName.length > 20) {
      alert("Ingredient Name cannot exceed 20 characters")
      return false;
    }
    else if (/\d/.test(ingredientName)) {
      alert("Ingredient Name cannot contain numbers")
      return false;
    }
    //check for empty characters in name?
    else if (quantity <= 0) {
      alert("Quantity must be greater than 0")
      return false;
    }
    else if (quantity > 5000) {
      alert("Quantity must be less or equal to 5000")//better suggestions for 1000?
      return false;
    }
    else if (quantityType.length == 0) {
      alert("Quantity Type must be selected")
      return false;
    }
    return true;
  }

  editIngredient(index: number) {
    //set the values of the ingredient being edited to the input fields
    const editedIngredient = this.ingredientList[index];
    this.ingredientInput = editedIngredient.ingredientName;
    this.quantityInput = editedIngredient.quantity;
    this.quantityType = editedIngredient.quantityType;
    this.editedIngredientIndex = index;

  }

  deleteIngredient(index: number) {
    this.deletedIngredientIndex = index;
    this.ingredientList.splice(index, 1);
    this.editedIngredientIndex = null;
  }

  generateRecipes() {
    //ingredientList.write to file
    //or send it to the new page or something, idk, ingredientList has all the ingredient objects
    this.router.navigate(['/ingredientsPage'/*replace me Puja*/]);
    console.log("generate receipes button pushed");
  }
}
