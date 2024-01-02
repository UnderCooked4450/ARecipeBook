import {Component} from '@angular/core';
import {LoginComponent} from './login/login.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LoginComponent],
  template: `
    <app-login></app-login>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'web-app';
}
