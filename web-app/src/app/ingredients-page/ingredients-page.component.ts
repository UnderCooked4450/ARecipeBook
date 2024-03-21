import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

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
  matchedTitles: Array<{ title: string, url: string }> = [];

  

  constructor(private authService: AuthService, private router: Router) {
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
      
      //if valid
      if (this.ingredientValid) {
        //if in editing mode for an ingredient
        if (this.editedIngredientIndex !==null) {
            //check iff new name, quantityType also refer to an existing ingredient
            let existingIngredientIndex = this.ingredientList.findIndex(
              (existingIngredient) =>
                existingIngredient.ingredientName === ingredient.ingredientName && existingIngredient.quantityType === ingredient.quantityType
            );
            if (existingIngredientIndex !== -1 && existingIngredientIndex !== this.editedIngredientIndex) {
              alert("Two ingredients with the same name, quantity type found. Please delete one and update the other")
              existingIngredientIndex = -1;
            }
            //else, if new name, quantityType are unique
            else {
              //update existing ingredient
              this.ingredientList[this.editedIngredientIndex] = ingredient;
              //reset value
              this.editedIngredientIndex = null;
            }
        }

        //if not in editing mode for an ingredient
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

  cancelEdit() {
    this.editedIngredientIndex = null;
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


  recipePage() {
  // Check if the ingredient list is empty
  if (this.ingredientList.length === 0) {
    // Display an alert window asking the user to add ingredients first
    alert('Please add ingredients first.');
    return; 
  }

  //extracting ingredient Names from list 
  const ingredientNames = this.ingredientList.map(ingredient => ingredient.ingredientName);
  this.authService.generateRecipes(ingredientNames).subscribe({
    next: (links) => {
      this.matchedTitles = links;
      this.authService.setRecipes(this.matchedTitles);
      this.router.navigate(['/recipe-page']);
    },
    error: (error) => {
      console.error('Search error:', error);
    }
  });
  }

  homePage() {
    this.router.navigate(['/homepage']);
    console.log("home page button pushed");
  }
}
