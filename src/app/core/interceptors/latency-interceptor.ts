import { HttpInterceptorFn } from '@angular/common/http';
import { delay } from 'rxjs';

export const latencyInterceptor: HttpInterceptorFn = (req, next) => {
  // only delay image-list API calls (not static assets)
  const shouldDelay = req.url.includes('picsum.photos');
  if (!shouldDelay) return next(req);
  const random = 200 + Math.floor(Math.random() * 100);
  return next(req).pipe(delay(random));
};
