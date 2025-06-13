import { HttpInterceptorFn } from '@angular/common/http';

export const urlInterceptor: HttpInterceptorFn = (req, next) => {
  // console.log(req);
  // console.log(next);
  return next(req);
};
