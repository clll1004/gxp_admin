import { Component, OnInit, HostListener } from '@angular/core';
import { LoginService } from "./login/login.service";
import { Router, NavigationEnd } from "@angular/router";
import '../assets/scss/style.scss';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [ LoginService ]
})

@HostListener('window:onbeforeunload', ['$event'])

export class AppComponent implements OnInit {
  public isShow: boolean = false;

  constructor(private router: Router, private loginService: LoginService ) {
    this.onBeforeUnload();
  }

  ngOnInit() {
    this.initLayoutStatus();
  }

  initLayoutStatus() {
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        this.isShow = !!this.loginService.getCookie('userInfo');
      }
    });
  }

  onBeforeUnload() {
    this.loginService.deleteCookie('userInfo');
    this.loginService.deleteCookie('userSeq');
    this.loginService.deleteCookie('userName');
  }
}
