import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { DataserviceService } from './dataservice.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AuthInterceptor } from './auth.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignalRService } from './signalR.service';
import { AuthHelperService } from './auth-helper.service';
import { AuthGuardService } from './auth-guard.service';
import { SignalRFuncService } from './signal-rfunc.service';

@NgModule({
  declarations: [
    AppComponent, LoginComponent, HomeComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, HttpModule, FormsModule, AppRoutingModule
  ],
  providers: [SignalRService, AuthHelperService, AuthGuardService, SignalRFuncService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    DataserviceService],
  bootstrap: [AppComponent]
})

export class AppModule { }
