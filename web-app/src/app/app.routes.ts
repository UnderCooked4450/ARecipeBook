import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from "./home/home.component"
import { IngredientsPageComponent } from './ingredients-page/ingredients-page.component';
import { CameraPageComponent } from './camera-page/camera-page.component';


export const routes: Routes = [ 
    { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login on the root path
    { path: 'login', component: LoginComponent },
    { path: 'homepage', component: HomeComponent },
    { path: 'ingredientsPage', component: IngredientsPageComponent },
    { path: 'camera', component: CameraPageComponent}

];
