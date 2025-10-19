import { HttpInterceptorFn } from '@angular/common/http';
import { delay } from 'rxjs';

export const latencyInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.includes('picsum.photos')) return next(req);
  const random = 200 + Math.floor(Math.random() * 100);
  return next(req).pipe(delay(random));
};
