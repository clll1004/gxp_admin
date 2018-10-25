import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/apis/adm/login/login.service';
import { CookieService } from '../../services/library/cookie/cookie.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']})

export class HeaderComponent implements OnInit {
  public userName:string = '';

  constructor(private loginService: LoginService, private cookieService: CookieService) { }

  ngOnInit() {
    this.userName = this.cookieService.getCookie('usr_nm');
  }

  logout() {
    this.loginService.logout();
  }
}

