import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authorizeGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  if (sessionStorage.length > 0 && sessionStorage.getItem('user') !== null)
    return true;

  router.navigate(['/login']);
  return false;
};
