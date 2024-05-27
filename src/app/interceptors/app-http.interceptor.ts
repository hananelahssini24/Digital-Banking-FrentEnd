// import { HttpInterceptorFn } from '@angular/common/http';
// import { inject } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from '../services/auth.service';

// export const appHttpInterceptor: HttpInterceptorFn = (req, next) => {
//   const router = inject(Router);
//    const authToken = inject(AuthService);
//    alert(authToken.accessToken);
//   const authReq = req.clone({
//     setHeaders: {
//       Authorization: `Bearer ${authToken.accessToken}`
//     }
//   });
//   return next(authReq);
// };


// import { Injectable } from '@angular/core';
// import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { AuthService } from '../services/auth.service';

// @Injectable()
// export class appHttpInterceptor implements HttpInterceptor {
//     constructor(private authService:AuthService) { }
//     intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//       alert(this.authService.accessToken);
//        if(!request.url.includes("/auth/login")){
//         let newRequest=request.clone({
//           headers:request.headers.set('Authorization','Bearer'+this.authService.accessToken)
//         })
       
//         return next.handle(newRequest);}
//         else
//         return next.handle(request);
//     }
// }


import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class appHttpInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Récupérer le jeton d'authentification
        const accessToken = this.authService.accessToken;

        // Vérifier si la requête ne concerne pas l'authentification
        if (!request.url.includes("/auth/login")) {
            // Ajouter le jeton d'authentification à l'en-tête
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
        }

        // Passer à la requête suivante
        return next.handle(request);
    }
}
