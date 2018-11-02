import { EventEmitter, Injectable, OnDestroy } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { AuthHelperService, AccessTokenInfo } from './auth-helper.service';
import { Config } from './config/config';

@Injectable({
  providedIn: 'root',
})
export class SignalRService implements OnDestroy {
  messageReceived = new EventEmitter<string>();
  private _hubConnection: HubConnection;

  constructor(private authHelper: AuthHelperService, private config: Config) {

  }

  init() {
    this.createConnection();
    this.startConnection();
  }

  private createConnection() {
    if (!this.authHelper.isOnline || this.authHelper.isTokenExpired()) {
      this.restartConnection(new Error('Access Token not valid.'));
      return;
    }

    this._hubConnection = new HubConnectionBuilder()
      .withUrl(`${this.config.get().API_URL}${this.config.get().SIGNALR_HUB}`,
        { accessTokenFactory: () => this.authHelper.getAccessTokenFromCache(), transport: signalR.HttpTransportType.WebSockets })
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this._hubConnection.onclose(err => {
      this.unSubscribeToServerEvents();
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

  private startConnection(): void {
    this._hubConnection
      .start()
      .then(() => {
        console.log('Hub connection started');
        this.subscribeToServerEvents();
      })
      .catch(err => {
        this.restartConnection(err);
      });
  }

  public publishMessage(message: string) {
    this._hubConnection.invoke('PublishMessage', message);
  }

  private subscribeToServerEvents(): void {
    this._hubConnection.on('MessageNotification', (data: any) => {
      this.messageReceived.emit('MessageNotification:' + data);
    });

    this._hubConnection.on('PublishMessageAck', (data: any) => {
      this.messageReceived.emit('MessageNotification - Ack :' + data);
    });
  }

  private unSubscribeToServerEvents(): void {
    this._hubConnection.off('MessageNotification');
    this._hubConnection.off('PublishMessageAck');
  }

  ngOnDestroy(): void {
    this.unSubscribeToServerEvents();
    this._hubConnection.stop().then(() => console.log('Hub connection stopped'));
  }
}
