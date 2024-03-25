import { CanActivateFn, Router } from '@angular/router';
import {inject} from '@angular/core'
export const verifyTokenGuard: CanActivateFn = (route, state) => {
  const token = sessionStorage.getItem('token-app');
  const router = inject(Router)
  if(!token){
    router.navigate(['landing'])
    return false
  }
  return true;
};
