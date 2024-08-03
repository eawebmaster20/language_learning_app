import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { NavigationService } from '../services/navigation.service';
import { inject } from '@angular/core';

export const routeAccessGuard: CanActivateFn = 
( route:ActivatedRouteSnapshot, 
  state:RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> => {
    
  // injects services
  const navigationService = inject(NavigationService);
  const router = inject(Router);


  // check if the user has visited  the mode route
  if(navigationService.hasModeVisited()) {
    return true;
  }
  else {
    // Redirect to the mode selection if not visited
    router.navigate(['/mode']); 
    return false;
  }

};


