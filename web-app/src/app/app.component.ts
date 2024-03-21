import {Component} from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './app.component.html'

  // ,styleUrls: ['./app.component.css'],
  // styleUrls: ['./app.component.css'],

  // styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'web-app';
}
