// services/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  if (req.url.includes('/auth/login')) {
    return next(req);
  }

  if (authService.accessToken) {
    const cloned = req.clone({
      headers: req.headers.set(
        'Authorization', `Bearer ${authService.accessToken}`
      )
    });
    return next(cloned);
  }
  return next(req);
};