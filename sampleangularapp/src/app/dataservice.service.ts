import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Config } from './config/config';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  constructor(private http: HttpClient, private config: Config) { }

  getUsers(): Observable<string[]> {
    return this.http.get<string[]>(this.getApiUrl().toLocaleLowerCase() + 'users');
  }

  private getApiUrl() {
        return this.config.get().API_URL;
      }
}
