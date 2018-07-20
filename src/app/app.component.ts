import { Component, OnInit } from '@angular/core';
import { LoginService } from "./login/login.service";
import { Router, NavigationEnd } from "@angular/router";


import '../assets/scss/style.scss';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ LoginService ]
})

export class AppComponent implements OnInit {
  public isShow: boolean = true;

  constructor(private router: Router, private loginService: LoginService ) {

  }

  ngOnInit() {
    this.load();
    this.loginService.checkUserInfo();
    this.initLayoutStatus();
  }

  load() {
    this.isShow = false;
  }

  initLayoutStatus() {
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        this.isShow = this.loginService.getLoginStatus();
      }
    });
  }
}
