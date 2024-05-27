import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const autheticationGuard: CanActivateFn = (route, state) => {
  if(inject(AuthService).isAuthenticated==true){
    return true
  }
  else{
  return false;
  inject(Router).navigateByUrl("/admin/notAuthorized");
  }
};


// import { Injectable } from '@angular/core';
// import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
// import { Observable } from 'rxjs';
// import { AuthService } from '../services/auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class autheticationGuard {
//   constructor(private authService:AuthService ,private router:Router){

//   }
//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     if(this.authService.isAuthenticated==true){
//       return true;
//     }
//     else
//     {
//       this.router.navigateByUrl("/login");
//       return false;
//     }
//   }
  
// }