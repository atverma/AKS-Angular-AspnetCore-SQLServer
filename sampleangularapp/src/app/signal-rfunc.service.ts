import { Injectable, EventEmitter, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HubConnection, IHttpConnectionOptions } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { Observable, throwError } from 'rxjs';
import { SignalRConnectionInfo } from './signalRConnectionInfo';
import { Config } from './config/config';

@Injectable({
    providedIn: 'root'
})
export class SignalRFuncService {
    hubConnection: HubConnection;
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

            this.createConnection(info.url, options);
            this.startConnection();
        },
        error => {
            console.error(`An error occurred during init: ${error}`);
            console.log('Retrying connection to Azure Function - SignalR Hub ...');
            setTimeout(() => {
                this.init();
            }, 10000);
        });
    }

    private createConnection(url: string, options: IHttpConnectionOptions) {
        this.hubConnection = new signalR.HubConnectionBuilder()
            .withUrl(url, options)
            .configureLogging(signalR.LogLevel.Information)
            .build();

        this.hubConnection.onclose(err => {
            console.log('Azure Function - SignalR Hub connection closed.');
            this.stopHubAndunSubscribeToServerEvents();
            this.restartConnection(err);
        });
    }

    private startConnection(): void {
        this.hubConnection
            .start()
            .then(() => {
                console.log('Azure Function - SignalR Hub connection started.');
                this.subscribeToServerEvents();
            })
            .catch(err => {
                this.restartConnection(err);
            });
    }

    private restartConnection(err: Error): void {
        console.log(`Error ${err}`);
        console.log('Retrying connection to Azure Function - SignalR Hub ...');

        setTimeout(() => {
            this.startConnection();
        }, 10000);
    }

    send(message: string) {
        const requestUrl = `${this.config.get().FUNCTION_APP_URL}sendmessage`;
        this.http.post(requestUrl, message).subscribe(
            (data: any) => console.log(`Func Hub sendMessage: ${message}`),
            error => console.error(`An error occurred in sendMessage: ${error}`)
        );
    }

    private subscribeToServerEvents(): void {
        this.hubConnection.on('sendMessage', (data: any) => {
            this.messageReceived.emit('MessageNotification - Function: ' + data);
        });
    }

    private stopHubAndunSubscribeToServerEvents(): void {
        this.hubConnection.off('sendMessage');
        this.hubConnection.stop().then(() => console.log('Hub connection stopped'));
    }
}



