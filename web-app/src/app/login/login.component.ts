import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule, MatDialogConfig } from '@angular/material/dialog';
import { TermsDialogComponent } from '../terms-dialog/terms-dialog.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatDialogModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  //moved constructor to top of class
  constructor(private dialog: MatDialog, private authService: AuthService, private router: Router) {}

  //login input vars
  loginEmail = '';
  loginPassword = '';

  //signup input vars
  signUpEmail = ''; 
  signUpPassword = '';
  confirmPassword = '';

  
 //rememberMe = false;

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

  login() {
    const credentials = {
      email: this.loginEmail, // Get from the form input
      password: this.loginPassword, // Get from the form input
     // rememberMe: this.rememberMe 
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
        if (error.error && error.error.message) {
          alert(error.error.message);
        } else {
          alert('An error occurred during login.');
        }
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
        if (error.error && error.error.message) {
          alert(error.error.message);
        } else {
          alert('An error occurred during sign up.');
        }
      }
    });
  }

  openTermsDialog(): void {
    const dialogConfig = new MatDialogConfig();

    // Disable closing by clicking outside the dialog
    dialogConfig.disableClose = true;
    // Focus on the first focusable element inside the dialog
    dialogConfig.autoFocus = true;
    // Adjust width as needed 
    dialogConfig.width = '500px'; 
    // Apply custom styling to the dialog
    dialogConfig.panelClass = 'custom-dialog-container'; 

    const dialogRef = this.dialog.open(TermsDialogComponent, dialogConfig);
  }
}

