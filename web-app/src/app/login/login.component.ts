import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule, MatDialogConfig } from '@angular/material/dialog';
import { TermsDialogComponent } from '../terms-dialog/terms-dialog.component';
import { ForgotPasswordDialogComponent } from '../forgot-password-dialog/forgot-password-dialog.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, MatDialogModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginEmail: string = '';
  loginPassword: string = '';
  rememberMe: boolean = true;
  //moved constructor to top of class
  constructor(private dialog: MatDialog, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    const storedRememberMe = localStorage.getItem('rememberMe');
    this.rememberMe = storedRememberMe === 'true';
    
    const storedEmail = localStorage.getItem('rememberedEmail');
    const storedPassword = localStorage.getItem('rememberedPassword');
    
    if (storedEmail && storedPassword && this.rememberMe) {
      this.loginEmail = storedEmail;
      this.loginPassword = storedPassword;
      this.rememberMe = true;
      console.log("rememberMe True in init");
    }
    // else {
    //   this.loginEmail = '';
    //   this.loginPassword = '';
    //   this.rememberMe = false;
    // }
  }

  //login input vars - moved to top of class and initialized in constructor
    //loginEmail = '';
    //loginPassword = '';


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

  ///////////
  toggleRememberMe(event: any) {
    this.rememberMe = event.target.checked;
    console.log(this.rememberMe);
  }
  

  login() {
    const credentials = {
      email: this.loginEmail, // Get from the form input
      password: this.loginPassword, // Get from the form input
      rememberMe: this.rememberMe 
      
    };
    //alert(credentials.email +  ", " + credentials.password + ", "+ credentials.rememberMe)
    if (credentials.rememberMe) {
      localStorage.setItem('rememberedEmail', this.loginEmail);
      localStorage.setItem('rememberedPassword', this.loginPassword);
      localStorage.setItem('rememberMe', 'true');
      //alert("entered");
      
    } else {
      // If  unchecked, clear stored credentials
      localStorage.removeItem('rememberedEmail');
      localStorage.removeItem('rememberedPassword');
      localStorage.removeItem('rememberMe');
    }
    this.authService.login(credentials).subscribe({
      next: value => {
        console.log('Login successful:', value);
        //check if remember me is clicked and store if it is
        
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
    
    //if email address is invalid
    if (!this.isValidEmail(user.email)) {
      alert("Invalid email address");
    }
    //if email address is valid
    else {
      //sign up user and login
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
  }

  //check if email is valid
  isValidEmail(email : string): boolean {
    const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailRegex.test(email);
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

  openForgotPasswordDialog(): void {
    const dialogConfig = new MatDialogConfig();

    // Disable closing by clicking outside the dialog
    dialogConfig.disableClose = true;
    // Focus on the first focusable element inside the dialog
    dialogConfig.autoFocus = true;
    // Adjust width as needed 
    dialogConfig.width = '500px'; 
    // Apply custom styling to the dialog
    dialogConfig.panelClass = 'custom-dialog-container'; 

                                       
    const dialogRef = this.dialog.open(ForgotPasswordDialogComponent, dialogConfig);
  }
}

