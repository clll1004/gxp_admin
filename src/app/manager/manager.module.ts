/**
 * Created by GRE511 on 2018-10-25.
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ManagerComponent } from './components/manager.component';
import { ListContainerComponent } from './components/list-container/list-container.component';
import { FormContainerComponent } from './components/form-container/form-container.component';
import { CustomerFormComponent } from './components/form-container/customerForm/customerForm.component';
import { ServiceFormComponent } from './components/form-container/serviceForm/serviceForm.component';
import { AccountFormComponent } from './components/form-container/accountForm/accountForm.component';

import { AdminApis } from '../services/apis/apis';
import { CustomerService } from '../services/apis/adm/customer/customer.service';
import { ServiceService } from '../services/apis/adm/service/service.service';
import { UserService } from '../services/apis/adm/user/user.service';

import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/primeng';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';

@NgModule({
  imports: [
    RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    DialogModule,
    ConfirmDialogModule,
    RadioButtonModule,
    CheckboxModule,
    DropdownModule,
    CalendarModule,
    InputTextModule,
    PasswordModule,
  ],
  exports: [ManagerComponent],
  declarations: [
    ManagerComponent,
    ListContainerComponent,
    FormContainerComponent,
    CustomerFormComponent,
    ServiceFormComponent,
    AccountFormComponent,
  ],
  providers: [
    AdminApis,
    CustomerService,
    ServiceService,
    UserService,
  ],
})

export class ManagerModule { }
