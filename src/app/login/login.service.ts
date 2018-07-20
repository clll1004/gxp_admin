import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Http, Headers } from '@angular/http';

@Injectable()
export class LoginService {
  constructor(private http: Http, private router: Router) {}

  getLoginStatus () {
    return !!this.getCookie('userInfo');
  }

  /* login function */
  login(id:string, password:string) {
    const data:any = {};
    data.usr_id = id;
    data.usr_pw = password;

    let headers:Headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    return this.http.post('http://183.110.11.49/adm/login', data, { headers: headers })
      .toPromise()
      .then(() => {
        const cookieData = id + "/" + password ;
        this.setCookie("userInfo", cookieData, 7, true);
        this.router.navigate(['/', 'manager','customer']);
      })
      .catch((error) => {
        alert('로그인 정보를 확인해주세요.');
        console.log(error);
      });
  }

  /* logout function */
  logout() {
    if(this.getCookie('userInfo')) {
      this.deleteCookie('userInfo');
      this.router.navigate(['/', 'login']);
    }
  }
  checkUserInfo() {
    if(!(this.getCookie('userInfo'))) {
      this.router.navigate(['/', 'login']);
    }
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
