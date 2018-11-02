import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthHelperService } from './auth-helper.service';
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public authHelper: AuthHelperService, public router: Router) { }

  canActivate(): boolean {
    if (!this.authHelper.isOnline() || this.authHelper.isTokenExpired()) {
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }
}
