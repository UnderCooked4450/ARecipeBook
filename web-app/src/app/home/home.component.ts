import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})



export class HomeComponent {

  
  constructor(private authService: AuthService, private router: Router) {
    
  }

  logout() {
    this.authService.logout().subscribe({
      next: value => {
        // If logout is successful, navigate to the login page
        this.router.navigate(['/login']);
      },
      error: error => {
        console.error('Logout error:', error);
        // Handle logout error
      }
    });
  }
  addIngredient() {
    this.router.navigate(['/ingredientsPage']);
    console.log("ingredient button pushed");
  }
}
