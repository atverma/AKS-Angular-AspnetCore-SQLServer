import { Component, OnInit } from '@angular/core';
import { AuthHelperService } from '../auth-helper.service';
import { Router } from '@angular/router';
import {Config} from '../config/config';
import { SignalRService } from '../signalR.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private _router: Router;
  private _auth: AuthHelperService;
  private _signalR: SignalRService;

  constructor(router: Router, auth: AuthHelperService, signalR: SignalRService, config: Config) {
    this._router = router;
    this._auth = auth;
    this._signalR = signalR;
  }

  ngOnInit() {
    if (this._auth.isOnline()) {
      this._auth.getAuthenticationToken().
      then((res: string) => {
        this._router.navigate(['/home']);
      })
      .catch(error => {
        this.login();
      });
    } else {
      this.login();
    }
  }

  login() {
    this._auth.login();
  }
}
