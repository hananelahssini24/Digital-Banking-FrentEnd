import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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

        // Passer à la requête suivante et intercepter les erreurs
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.authService.logout();
                }
                // Renvoyer l'erreur pour qu'elle puisse être traitée par l'appelant
                return throwError(error);
            })
        );
    }
}



//***************************************************************************************************** */
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






















