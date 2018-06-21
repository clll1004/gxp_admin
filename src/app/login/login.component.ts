import { Component } from '@angular/core';
import { userData } from "./login-interface.component";
import { Router } from "@angular/router";
import { LoginService } from "./login.service";

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ LoginService ]
})

export class LoginComponent {
  userData: userData = {
    userId: '',
    userPassword: ''
  };

  constructor(private router: Router, private loginService: LoginService) { }

  login() {
    this.loginService.login(this.userData.userId, this.userData.userPassword);
  }
}


