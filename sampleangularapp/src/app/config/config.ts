import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Config {

  constructor(private http: HttpClient) {
  }

  get() {
    return environment.ApplicationConfig;
  }
}
