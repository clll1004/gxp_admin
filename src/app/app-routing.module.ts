import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from "./login/login.component";
import { ManagerComponent } from "./manager/manager.component";

const routes: Routes = [
  { path: '', redirectTo: 'manager/customer', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'manager', component: ManagerComponent },
  { path: 'manager/:listId', component: ManagerComponent },
  { path: 'manager/:listId/:subId', component: ManagerComponent },
  { path: 'manager/:listId/:modify/:index', component: ManagerComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}