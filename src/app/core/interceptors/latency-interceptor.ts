import { HttpInterceptorFn } from '@angular/common/http';
import { delay } from 'rxjs';

export const latencyInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.includes('picsum.photos')) return next(req);
  // Loading new photos should have a random delay of 200-300ms.
  const random = 200 + Math.floor(Math.random() * 100);
  return next(req).pipe(delay(random));
};
