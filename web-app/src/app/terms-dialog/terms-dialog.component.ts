import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-terms-dialog',
  standalone: true,
  imports: [],
  templateUrl: './terms-dialog.component.html',
  styleUrl: './terms-dialog.component.css'
})
export class TermsDialogComponent implements OnInit{

  constructor(public dialogRef: MatDialogRef<TermsDialogComponent>) { }

  ngOnInit(): void {
  }
}
