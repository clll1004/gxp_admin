/**
 * Created by GRE511 on 2018-07-12.
 */
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from "@angular/router";
import { Observable } from "rxjs/internal/Observable";

@Injectable()
export class CustomerService {
  constructor(private http: Http, private router: Router) {}

  getLists(listUrl): Observable<any> {
    return this.http.get(listUrl);
  }

  postCustomer(data) {
    let headers:Headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    return this.http.post('http://183.110.11.49/adm/customer', data, { headers: headers })
      .toPromise()
      .then(() => {this.router.navigate(['/manager', 'customer']);})
      .then(() => {alert('완료되었습니다.');})
      .catch((error) => {
        console.log(error);
      })
  }

  updateCustomer(newData) {
    let headers:Headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    return this.http.put('http://183.110.11.49/adm/customer', newData, { headers: headers })
      .toPromise()
      .then(() => {window.location.reload();})
      .then(() => {alert('수정 완료되었습니다.');})
      .catch((error) => {
        console.log(error);
      })
  }
}