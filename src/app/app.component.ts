import { Component, OnInit } from '@angular/core';
import { LoginService } from "./services/apis/adm/login/login.service";
import { Router, NavigationEnd } from "@angular/router";
import '../assets/scss/style.scss';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  public isLayoutShow: boolean = false;

  constructor(private router: Router, private loginService: LoginService ) {
  }

  ngOnInit() {
    this.loginService.checkUserInfo();

    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        if(event.url === '/' || event.url === '/login') {
          this.loginService.logout();
          this.isLayoutShow = false;
        } else {
          this.isLayoutShow = true;
        }
      }
    });
  }
}
