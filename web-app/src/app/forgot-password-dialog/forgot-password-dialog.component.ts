import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password-dialog',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './forgot-password-dialog.component.html',
  styleUrl: './forgot-password-dialog.component.css'
})

export class ForgotPasswordDialogComponent {
  
  constructor(public dialogRef: MatDialogRef<ForgotPasswordDialogComponent>) {  }

  

  ngOnInit(): void {
  }

  emailInput = ''; 

  //check if email is valid
  isValidEmail(email : string): boolean {
    const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailRegex.test(email);
  }

  submit()
  {
    //check if input is valid email address
    if (this.isValidEmail(this.emailInput)) {
      alert("Email sent successfully");

      //send an email logic here//

      this.dialogRef.close();
    }
    else {
      alert("Input is not a valid email address")
    }
  }
}
