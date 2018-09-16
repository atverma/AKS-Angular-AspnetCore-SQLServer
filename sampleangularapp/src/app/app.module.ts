import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { DataserviceService } from './dataservice.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { HttpModule } from '@angular/http';

import { APP_INITIALIZER } from '@angular/core';

import { Config } from './config/config';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, HttpModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
