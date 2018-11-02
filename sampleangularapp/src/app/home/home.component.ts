import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataserviceService } from '../dataservice.service';
import { SignalRService } from '../signalR.service';
import { SignalRFuncService } from '../signal-rfunc.service';
import { AuthHelperService } from '../auth-helper.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Azure Kubernetes Service: Sample Angular App';
  public async: any;
  messageSignalR: string;
  messageSignalRFunc: string;
  messages: string[] = [];
  Users: Observable<string[]>;
  errors: string[] = [];

  constructor(private dataService: DataserviceService,
    private signalRService: SignalRService,
    private signalRFuncService: SignalRFuncService,
    private authHelper: AuthHelperService) {
  }

  ngOnInit() {
    if (this.authHelper.getAccessTokenFromCache()) {
      this.signalRFuncService.init();

      this.signalRFuncService.messageReceived.subscribe((message: string) => {
        this.messages.push(message);
      });

      this.signalRService.init();

      this.signalRService.messageReceived.subscribe((message: string) => {
        this.messages.push(message);
      });
    } else {
      throw new Error('Access token is not valid.');
    }
  }

  sendMessageToFunc() {
    this.signalRFuncService.send(this.messageSignalRFunc);
  }

  getUsers() {
    this.Users = this.dataService.getUsers();
  }

  logout() {
    this.authHelper.logout();
  }

  sendMessage() {
    this.signalRService.publishMessage(this.messageSignalR);
  }
}
