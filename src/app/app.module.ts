import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';

import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { LoginComponent } from "./login/login.component";
import { ManagerComponent } from "./manager/manager.component";
import { ListContainerComponent } from "./manager/list-container/list-container.component";
import { FormContainerComponent } from "./manager/form-container/form-container.component";
import { CustomerFormComponent } from "./manager/form-container/customerForm/customerForm.component";
import { ServiceFormComponent } from "./manager/form-container/serviceForm/serviceForm.component";
import { AccountFormComponent } from "./manager/form-container/accountForm/accountForm.component";
import { TransCodingComponent } from "./transcoding/transcoding.component";
import { TcListContainerComponent } from "./transcoding/tcListContainer/tcListContainer.component";
import { ServerFormComponent } from "./transcoding/serverForm/serverForm.component";

import { AppRoutingModule } from "./app-routing.module";

/*for primeNG*/
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { TreeTableModule } from 'primeng/treetable';
import { AccordionModule } from 'primeng/accordion';
import { PasswordModule } from 'primeng/password';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { GrowlModule } from 'primeng/growl';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PanelModule } from 'primeng/panel';
import { RadioButtonModule } from 'primeng/radiobutton';
import { KeyFilterModule } from 'primeng/keyfilter';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from "primeng/primeng";
import { ConfirmDialogModule } from 'primeng/primeng';

import { LoginService } from './login/login.service';

@NgModule({
  declarations: [
    AppComponent,

    HeaderComponent,
    FooterComponent,
    LoginComponent,
    ManagerComponent,
    ListContainerComponent,
    FormContainerComponent,
    CustomerFormComponent,
    ServiceFormComponent,
    AccountFormComponent,
    TransCodingComponent,
    TcListContainerComponent,
    ServerFormComponent
  ],
  imports: [
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

    AppRoutingModule
  ],
  providers: [ LoginService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
