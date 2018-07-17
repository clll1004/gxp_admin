import { Component, OnInit } from '@angular/core';
import { userData } from "./login-interface.component";
import { LoginService } from "./login.service";
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ LoginService ]
})

export class LoginComponent implements OnInit {
  userData: userData = {
    userId: null,
    userPassword: null
  };

  public loginform: FormGroup;
  public submitted: boolean = false;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService) { }

  ngOnInit() {
    this.loginform = this.formBuilder.group({
      'user_id': new FormControl(null, Validators.required),
      'user_password': new FormControl(null, Validators.required)
    });
  }

  onSubmit(value) {
    this.submitted = true;

    this.userData.userId = value.user_id;
    this.userData.userPassword = value.user_password;

    this.loginService.login(this.userData.userId, this.userData.userPassword);
  }
}


