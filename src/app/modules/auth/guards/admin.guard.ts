import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, catchError, map, of } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state): Observable<boolean> => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const isAdmin :Observable<boolean> = authService.isAdmin().pipe(
    map((permiso) => {
      if(permiso){
        return true
      }
      router.navigate(['home'])
      return false
    }),
    catchError((error) => {
      router.navigate(['home'])
      console.log(error)
      return of(false);
    })
  )

  return isAdmin

};
