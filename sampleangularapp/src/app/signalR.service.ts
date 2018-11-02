import { EventEmitter, Injectable, OnDestroy, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { AuthHelperService, AccessTokenInfo } from './auth-helper.service';
import { Config } from './config/config';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  messageReceived = new EventEmitter<string>();
  hubConnection: HubConnection;

  constructor(private authHelper: AuthHelperService, private config: Config) {
  }

  init() {
    this.createConnection();
    this.startConnection();
  }

  private createConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${this.config.get().API_URL}${this.config.get().SIGNALR_HUB}`,
        { accessTokenFactory: () => this.authHelper.getAccessTokenFromCache() })
      .configureLogging(signalR.LogLevel.Information)
      .build();

    this.hubConnection.onclose(err => {
      console.log('SignalR hub connection closed.');
      this.stopHubAndunSubscribeToServerEvents();
      this.restartConnection(err);
    });
  }

  private restartConnection(err: Error): void {
    console.log(`Error ${err}`);
    console.log('Retrying connection to SignalR Hub ...');

    setTimeout(() => {
      this.startConnection();
    }, 10000);
  }

  private startConnection(): void {
    this.hubConnection
      .start()
      .then(() => {
        console.log('SignalR Hub connection started');
        this.subscribeToServerEvents();
      })
      .catch(err => {
        this.restartConnection(err);
      });
  }

  public publishMessage(message: string) {
    this.hubConnection.invoke('PublishMessage', message);
  }

  private subscribeToServerEvents(): void {
    this.hubConnection.on('MessageNotification', (data: any) => {
      this.messageReceived.emit('MessageNotification:' + data);
    });

    this.hubConnection.on('PublishMessageAck', (data: any) => {
      this.messageReceived.emit('MessageNotification - Ack :' + data);
    });
  }

  private stopHubAndunSubscribeToServerEvents(): void {
    this.hubConnection.off('MessageNotification');
    this.hubConnection.off('PublishMessageAck');
    this.hubConnection.stop().then(() => console.log('Hub connection stopped'));
  }
}
