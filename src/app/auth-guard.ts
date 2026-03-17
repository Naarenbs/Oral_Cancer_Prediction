import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  
  const authService = inject(AuthService);
  const router = inject(Router);


  if (authService.isAuthenticated) {
    
    return true; 
  } else {
    
    console.log('Access denied. Redirecting to login page.');
    router.navigate(['/auth']);
   
    return false; 
  }
};
