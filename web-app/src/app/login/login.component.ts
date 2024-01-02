import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  //login input vars
  loginEmail = '';
  loginPassword = '';

  //signup input vars
  signUpEmail = ''; 
  signUpPassword = '';
  confirmPassword = '';

  //login vs Register form vars
  isShowLogin = false; 
  isShowRegister = true;

  toggleViewLogin() {  
    this.isShowLogin = false; 
    this.isShowRegister = true; 
  }  
  toggleViewRegister() {  
    this.isShowLogin = true; 
    this.isShowRegister = false;  
  }  

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    const credentials = {
      email: this.loginEmail, // Get from the form input
      password: this.loginPassword, // Get from the form input
    };

    this.authService.login(credentials).subscribe({
      next: value => {
        console.log('Login successful:', value);
        // If login is successful, navigate to the homepage
        this.router.navigate(['/homepage']);
        window.location.href = '/homepage';
      },
      error: error => {
        console.error('Error password and username do no match', error);
        // Handle login error
      }
    });
  }

  signUp() {
    const user = {
      email: this.signUpEmail, // Get from the form input
      password: this.signUpPassword, // Get from the form input
      confirmPassword: this.confirmPassword,
    };

    this.authService.signUp(user).subscribe({
      next: value => {
        console.log('Sign up successful:', value);
        // If sign up is successful, navigate to the homepage
        this.router.navigate(['/homepage']);
      },
      error: error => {
        console.error('Sign up error:', error);
        // Handle sign up error
      }
    });
  }
}

