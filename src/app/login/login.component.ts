import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/apis/adm/login/login.service';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Sha256 } from '../services/library/hash/sha256';
import { AdminApis } from '../services/apis/apis';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [Sha256, AdminApis]})

export class LoginComponent implements OnInit {
  public userData: any = {
    userId: '',
    userPassword: ''
  };
  public loginform: FormGroup;
  public submitted: boolean = false;
  public isShowLoginMessage: boolean = false;


  constructor(private formBuilder: FormBuilder,
              private loginService: LoginService,
              private sha256: Sha256,
              private adminApi: AdminApis,
              private router: Router) { }

  ngOnInit() {
    this.loginform = this.formBuilder.group({
      'user_id': new FormControl(null, Validators.required),
      'user_password': new FormControl(null, Validators.required)
    });
  }

  onSubmit(value) {
    this.submitted = true;

    this.userData.userId = value.user_id;
    this.userData.userPassword = this.sha256.get(value.user_password);

    this.loginService.login(this.adminApi.login, this.userData.userId, this.userData.userPassword)
      .toPromise()
      .then((data) => {
        this.loginService.setLogin();
        const serverData = JSON.parse(data['_body']);
        const user = this.userData.userId + '/' + this.userData.userPassword;
        this.loginService.setCookieData(user, serverData.usr_seq, serverData.usr_nm);
        this.router.navigate(['/', 'manager','customer']);
      })
      .catch((error) => {
        this.isShowLoginMessage = true;
        console.log(error);
      });
  }
}


