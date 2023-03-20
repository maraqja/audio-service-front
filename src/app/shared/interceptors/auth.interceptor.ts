import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.authService.isAuth()) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.authService.token}`
        }        
      })
    }
    return next.handle(request)
    // .pipe(
    //   catchError((error: HttpErrorResponse) => {
    //     console.log('[Interceptor Error]: ', error)
    //     if (error.status === 401) {
    //       this.authService.logout()
    //       this.router.navigate(['login'], {queryParams: {authFailed: true}})
    //     }
    //     return throwError(error)
    //   })
    // )
  }
}
