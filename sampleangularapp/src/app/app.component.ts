import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DataserviceService } from './dataservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Azure Kubernetes Service: Sample Angular App';

  constructor(
    private dataService: DataserviceService
  ) {

  }

  Users: Observable<string[]>;

  getUsers() {
    this.Users = this.dataService.getUsers();
  }
}
