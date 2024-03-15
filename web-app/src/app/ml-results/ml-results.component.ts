import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ml-results',
  standalone: true,
  imports: [],
  templateUrl: './ml-results.component.html',
  styleUrl: './ml-results.component.css'
})
export class MlResultsComponent {
  constructor(private router: Router) {}

  home(){
    this.router.navigate(["/homepage"])
  }

}
