import {Component} from '@angular/core';
import { RouterModule } from '@angular/router';
import { RecipeService } from './recipe.service'; 

//webscraper
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './app.component.html'
  // ,styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'web-app';
   
  // Property to hold the search query for webscraper
  searchQuery: string = '';  
  // Method to handle the webscraper search
  searchRecipes(): void {
    window.location.href = `https://www.allrecipes.com/search?q=${this.searchQuery}`;
}
}
