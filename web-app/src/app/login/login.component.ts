import { Component } from '@angular/core';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RegisterComponent],
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

}
