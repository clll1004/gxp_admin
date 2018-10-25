import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';
import { AppRoutingModule } from "./app-routing.module";

import { LoginModule } from './login/login.module';
import { HeaderModule } from './header/header.module';
import { FooterModule } from './footer/footer.module';
import { ManagerModule } from './manager/manager.module';
import { TranscodingModule } from './transcoding/transcoding.module';

import { CookieService } from './services/library/cookie/cookie.service';
import { LoginService } from './services/apis/adm/login/login.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    LoginModule,
    HeaderModule,
    FooterModule,
    ManagerModule,
    TranscodingModule,
    BrowserModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [CookieService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
