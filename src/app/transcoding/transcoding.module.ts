/**
 * Created by GRE511 on 2018-10-25.
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TransCodingComponent } from './components/transcoding.component';
import { TcListContainerComponent } from './components/tcListContainer/tcListContainer.component';
import { ServerFormComponent } from './components/serverForm/serverForm.component';

import { TranscodingService } from '../services/apis/adm/transcoding/transcoding.service';
import { AdminApis } from '../services/apis/apis';

import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
  imports: [
    RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    TableModule,
    DialogModule,
    ConfirmDialogModule,
    DropdownModule,
    RadioButtonModule,
    InputTextModule,
    InputTextareaModule,
  ],
  exports: [TransCodingComponent],
  declarations: [
    TransCodingComponent,
    TcListContainerComponent,
    ServerFormComponent,
  ],
  providers: [
    TranscodingService,
    AdminApis,
  ]
})

export class TranscodingModule { }
