import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authorizationGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  let requiredRole = route.data['role'];

  // roles est une string: "ROLE_USER ROLE_ADMIN"
  if (authService.roles.includes(requiredRole)) {
    return true;
  }
  router.navigateByUrl('/notAuthorized');
  return false;
};