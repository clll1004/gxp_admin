import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from "./login/login.component";
import { ManagerComponent } from "./manager/manager.component";
import { TransCodingComponent } from "./transcoding/transcoding.component";

const routes: Routes = [
  { path: '', redirectTo: 'manager/customer', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'manager', component: ManagerComponent },
  { path: 'manager/:listId', component: ManagerComponent },
  { path: 'manager/:listId/:subId', component: ManagerComponent },
  { path: 'manager/:listId/:modify/:index', component: ManagerComponent },
  { path: 'transcoding', component: TransCodingComponent },
  { path: 'transcoding/:id', component: TransCodingComponent },
  { path: 'transcoding/:id/:subId', component: TransCodingComponent },
  { path: 'transcoding/:id/:modify/:index', component: TransCodingComponent }
];
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}