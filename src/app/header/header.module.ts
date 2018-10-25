/**
 * Created by GRE511 on 2018-10-25.
 */
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HeaderComponent } from './components/header.component';

import { CookieService } from '../services/library/cookie/cookie.service';
import { LoginService } from '../services/apis/adm/login/login.service';

@NgModule({
  imports: [
    RouterModule,
  ],
  exports: [HeaderComponent],
  declarations: [HeaderComponent],
  providers: [CookieService, LoginService],
})

export class HeaderModule { }

