import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";

import { LoginModule } from './login/login.module';
import { HeaderModule } from './header/header.module';
import { FooterModule } from './footer/footer.module';
import { TranscodingModule } from './transcoding/transcoding.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';

import { ManagerComponent } from "./manager/manager.component";
import { ListContainerComponent } from "./manager/list-container/list-container.component";
import { FormContainerComponent } from "./manager/form-container/form-container.component";
import { CustomerFormComponent } from "./manager/form-container/customerForm/customerForm.component";
import { ServiceFormComponent } from "./manager/form-container/serviceForm/serviceForm.component";
import { AccountFormComponent } from "./manager/form-container/accountForm/accountForm.component";

import { AppRoutingModule } from "./app-routing.module";

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
    ManagerComponent,
    ListContainerComponent,
    FormContainerComponent,
    CustomerFormComponent,
    ServiceFormComponent,
    AccountFormComponent,
  ],
  imports: [
    LoginModule,
    HeaderModule,
    FooterModule,
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
