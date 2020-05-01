import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable()
export class HttpinterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      headers: req.headers
        .set('Cache-Control', 'no-cache')
        .set('Pragma', 'no-cache')
        .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
    });
    return next.handle(req);
  }

}
