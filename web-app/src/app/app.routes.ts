import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from "./home/home.component"
import { IngredientsPageComponent } from './ingredients-page/ingredients-page.component';
import { CameraPageComponent } from './camera-page/camera-page.component';
import { TimerComponent } from './timer/timer.component';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login on the root path
  { path: 'login', component: LoginComponent },
  { path: 'homepage', component: HomeComponent },
  { path: 'camera', component: CameraPageComponent },
  { path: 'ingredientsPage', component: IngredientsPageComponent },
  { path: 'timer', component: TimerComponent },
];