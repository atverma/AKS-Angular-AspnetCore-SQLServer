import { Injectable, EventEmitter, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HubConnection } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { Observable, throwError } from 'rxjs';
import { SignalRConnectionInfo } from './signalRConnectionInfo';
import { Config } from './config/config';

@Injectable({
    providedIn: 'root'
})
export class SignalRFuncService implements OnDestroy {
    private hubConnection: HubConnection;
    messageReceived = new EventEmitter<string>();

    constructor(private http: HttpClient, private config: Config) {
    }

    private getConnectionInfo(): Observable<SignalRConnectionInfo> {
        const requestUrl = `${this.config.get().FUNCTION_APP_URL}negotiate`;
        return this.http.post<SignalRConnectionInfo>(requestUrl, null);
    }

    init() {
        this.getConnectionInfo().subscribe((info: SignalRConnectionInfo) => {
            const options = {
                accessTokenFactory: () => info.accessToken
            };

            this.hubConnection = new signalR.HubConnectionBuilder()
                .withUrl(info.url, options)
                .configureLogging(signalR.LogLevel.Information)
                .build();

            this.startConnection();

            this.hubConnection.on('sendMessage', (data: any) => {
                this.messageReceived.emit('MessageNotification - Function: ' + data);
            });

            this.hubConnection.onclose(err => {
                console.log('Retrying connection ...');
                setTimeout(() => {
                    this.init();
                }, 5000);
            });
        },
            error => {
                console.error(`An error occurred: ${error}`);
                console.log('Retrying connection ...');
                setTimeout(() => {
                    this.init();
                }, 5000);
            });
    }

    private startConnection(): void {
        this.hubConnection
            .start()
            .then(() => {
                console.log('Func Hub connection started');
            })
            .catch(err => {
                this.restartConnection(err);
            });
    }

    private restartConnection(err: Error): void {
        console.log(`Error ${err}`);
        console.log('Retrying connection ...');

        setTimeout(() => {
            this.startConnection();
        }, 5000);
    }

    send(message: string) {
        const requestUrl = `${this.config.get().FUNCTION_APP_URL}sendmessage`;
        this.http.post(requestUrl, message).subscribe(
            (data: any) => console.log(`Func Hub send Message: ${message}`),
            error => console.error(`An error occurred: ${error}`)
        );
    }

    private unSubscribeToServerEvents(): void {
        this.hubConnection.off('sendMessage');
    }

    ngOnDestroy(): void {
        this.unSubscribeToServerEvents();
        this.hubConnection.stop().then(() => console.log('Hub connection stopped'));
    }
}



