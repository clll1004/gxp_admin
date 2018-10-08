import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Http, Headers } from '@angular/http';

@Injectable()
export class LoginService {
  public loginInfo:any = {};
  public loginStatus:boolean = false;

  constructor(private http: Http, private router: Router) { }

  getLoginStatus() {
    return this.loginStatus;
  }

  setLogin() {
    this.loginStatus = true;
  }

  setLogout() {
    this.loginStatus = false;
  }

  login(url:string, id:string, password:string) {
    this.loginInfo.usr_id = id;
    this.loginInfo.usr_pw = password;

    let headers:Headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=UTF-8');

    return this.http.post(url, this.loginInfo, { headers: headers });
  }

  setCookieData(userInfo, user_seq, user_name) {
    this.setCookie('userInfo', userInfo, 7, true);
    this.setCookie('usr_seq', user_seq, 7);
    this.setCookie('usr_nm', user_name, 7);
  }

  logout() {
    if(this.getCookie('userInfo')) {
      this.clearUserInfo();
    }
  }

  checkUserInfo() {
    if(!(this.getCookie('userInfo'))) {
      this.clearUserInfo();
    }
  }

  clearUserInfo() {
    this.setLogout();
    this.deleteCookie('userInfo');
    this.deleteCookie('usr_seq');
    this.deleteCookie('usr_nm');
    this.router.navigate(['/', 'login']);
  }

  /* Cookie */
  getCookie(name:string, isDecoding:boolean = false) {
    const data = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    const value = data? data[2] : null;

    return isDecoding ? atob(value) : value;
  }
  setCookie(name:string, value:string, exp:number, isEncoding:boolean = false) {
    const date = new Date();
    date.setTime(date.getTime() + exp*1000*60*60*24);

    document.cookie = name + "=" + (isEncoding ? btoa(value) : value) + "; expires=" + date.toUTCString() + "; path=/";
    return 0;
  }
  deleteCookie(name:string) {
    this.setCookie(name, '', -1);
  }
}
