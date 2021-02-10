import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse} from "@angular/common/http";
import { Observable,throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable()
export class HttpinterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


     req = req.clone({
      headers: req.headers
        .set('Cache-Control', 'no-cache')
        .set('Pragma', 'no-cache')
        .set('Expires', 'Sat, 01 Jan 2000 00:00:00 GMT')
    });
    return next.handle(req).pipe(catchError(error => {let errorMessage = '';
  if (error instanceof ErrorEvent){
    //Error del lado del cliente
    errorMessage = `Error del cliente: ${error.error.messaje}`;
  }
  else
  {
    errorMessage = `Error del servidor: ${error.status} ${error.message}`;
  }
  //codigo para mostrar error en una parte fija de la pantalla
        return throwError(errorMessage);
    })) 
   
  }

}
