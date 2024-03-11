// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { DataService } from '../data.service'; // Adjust the path as necessary

// @Component({
//   selector: 'app-ingredients',
//   templateUrl: './ingredients.component.html',
//   styleUrls: ['./ingredients.component.css']
// })
// export class IngredientsComponent implements OnInit {
//   ingredients: string[] = [];
//   newIngredient: string = '';

//   constructor(private dataService: DataService, private router: Router) {}

//   ngOnInit(): void {
//     this.ingredients = this.dataService.getData() || [];
//   }

//   searchNewIngredient(): void {
//     if (!this.newIngredient) return;
//     // Logic to search for the new ingredient
//     // This might involve calling another service method or updating the current ingredients list
//     console.log('Searching for:', this.newIngredient);
//     // Reset the search bar after search
//     this.newIngredient = '';
//   }

//   goBack(): void {
//     this.router.navigate(['/homepage']); // Navigate back to the HomeComponent
//   }
// }
