import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']})

export class HeaderComponent implements OnInit {
  public userName:string = '';

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.userName = this.loginService.getCookie('usr_nm');
  }

  logout() {
    this.loginService.logout();
  }
}

