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
        return from(this.inj.getAccessTokenFromCache())
            .pipe((switchMap(token => {
                req = req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${token}`
                    }
                });
                return next.handle(req);
            })));
    }
}
