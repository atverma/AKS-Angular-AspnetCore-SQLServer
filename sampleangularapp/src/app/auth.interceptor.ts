import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthHelperService } from './auth-helper.service';
import { Config } from './config/config';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private inj: AuthHelperService, private config: Config) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.inj != null && this.inj.getAccessTokenFromCache() != null) {
            const token = 'Bearer ' + this.inj.getAccessTokenFromCache();

            req = req.clone({
              setHeaders: {
                'Content-Type': 'application/json; charset=utf-8',
                'Accept': 'application/json',
                'Authorization': token
              },
            });
          }

          return next.handle(req);
    }
}
