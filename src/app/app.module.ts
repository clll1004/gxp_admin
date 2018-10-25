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

/*for primeNG*/
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TreeTableModule } from 'primeng/treetable';
import { AccordionModule } from 'primeng/accordion';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { GrowlModule } from 'primeng/growl';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PanelModule } from 'primeng/panel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { KeyFilterModule } from 'primeng/keyfilter';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from "primeng/primeng";
import { ConfirmDialogModule, CalendarModule } from 'primeng/primeng';
import { CheckboxModule } from 'primeng/checkbox';

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

    InputTextModule,
    ButtonModule,
    TableModule,
    TreeTableModule,
    AccordionModule,
    PasswordModule,
    InputTextareaModule,
    GrowlModule,
    FormsModule,
    ReactiveFormsModule,
    PanelModule,
    RadioButtonModule,
    KeyFilterModule,
    DropdownModule,
    DialogModule,
    ConfirmDialogModule,
    CalendarModule,
    CheckboxModule,

    AppRoutingModule
  ],
  providers: [CookieService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
