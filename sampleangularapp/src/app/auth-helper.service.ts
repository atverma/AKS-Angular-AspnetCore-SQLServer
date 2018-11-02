import { EventEmitter, Injectable } from '@angular/core';
import * as Msal from 'msal';
import { Config } from './config/config';
import * as jwt_decode from 'jwt-decode';

@Injectable({
    providedIn: 'root',
})
export class AuthHelperService {
    private clientApplication: Msal.UserAgentApplication = null;
    public connectionEstablished = new EventEmitter<AccessTokenInfo>();
    AccessTokenKey = 'sample.access.token';
    constructor(private config: Config) {
        this.clientApplication =
            new Msal.UserAgentApplication(
                this.config.get().CLIENT_ID,
                this.config.get().AUTHORITY,
                this.authCallback,
                {
                    redirectUri: window.location.origin
                });
    }

    private authCallback(errorDesc: any, token: any, error: any, tokenType: any) {
        if (error) {
            console.error(`${error} ${errorDesc}`);
        } else {
            console.log(`Received ${tokenType} token.`);
        }
    }

    public login() {
        this.clientApplication.loginRedirect(this.config.get().SCOPES);
    }

    public logout() {
        this.saveAccessTokenToCache(null);
        this.clientApplication.logout();
    }

    public isOnline(): boolean {
        return this.clientApplication.getUser() != null;
    }

    public getAuthenticationToken(): Promise<string> {
        const self = this;
        const user = this.clientApplication.getUser();
        const authority = this.config.get().AUTHORITY;

        return this.clientApplication.acquireTokenSilent(this.config.get().SCOPES_WEB,
            authority, user)
            .then(token => {
                console.log(`Received Access token.`);
                this.saveAccessTokenToCache(token);
                self.connectionEstablished.emit({ accessToken: token, isConnected: true });
                return token;
            }).catch(error => {
                console.log(`Error: Access token API : ${error}.`);
                this.clientApplication.acquireTokenRedirect(this.config.get().SCOPES_WEB);
                return null;
            });
    }

    saveAccessTokenToCache(accessToken: string): void {
        sessionStorage.setItem(this.AccessTokenKey, accessToken);
    }

    getAccessTokenFromCache(): string {
        if (sessionStorage.hasOwnProperty(this.AccessTokenKey)
            && sessionStorage[this.AccessTokenKey] !== '') {
            return sessionStorage[this.AccessTokenKey];
        }
        return null;
    }

    getTokenExpirationDate(token: string): Date {
        const decoded: TTokenDto = jwt_decode(token);
        if (decoded.exp === undefined) {
            return null;
        }

        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date;
    }

    isTokenExpired(token?: string): boolean {
        if (!token) {
            token = this.getAccessTokenFromCache();
        }

        if (!token) {
            return true;
        }

        const date = this.getTokenExpirationDate(token);
        if (date === undefined) {
            return false;
        }

        return !(date.valueOf() > new Date().valueOf());
    }
}

export class AccessTokenInfo {
    isConnected: boolean;
    accessToken: string;
}

export class TTokenDto {
    exp: number;
}

