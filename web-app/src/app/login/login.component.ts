import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
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
      // implement user authentication logic
  
  }

  SignUp() {
     //implement user sign up logic
  }

}
