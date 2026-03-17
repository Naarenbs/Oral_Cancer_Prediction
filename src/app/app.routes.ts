import { Routes } from '@angular/router';
import { authGuard } from './auth-guard'; 


import { HomeComponent } from './components/home/home.component';

import { MlModelComponent } from './components/ml-model/ml-model.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { AboutComponent } from './components/about/about.component';
import { AuthComponent } from './components/auth/auth.component';

export const routes: Routes = [
  
  { path: '', component: HomeComponent },
  { path: 'auth', component: AuthComponent }, 
  { path: 'about', component: AboutComponent },

 
  { 
    path: 'ml-model', 
    component: MlModelComponent,
    canActivate: [authGuard] 
  },
  { 
    path: 'reviews', 
    component: ReviewsComponent,
    canActivate: [authGuard] // <-- And here
  },

  { path: '**', redirectTo: '' }
];
