import { Component } from '@angular/core';
import { LoginService } from "../login/login.service";

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [ LoginService ]
})
export class HeaderComponent {
  constructor(private loginService: LoginService) { }

  logout() {
    this.loginService.logout();
  }
}

