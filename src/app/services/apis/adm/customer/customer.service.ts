/**
 * Created by GRE511 on 2018-07-12.
 */
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from "rxjs/internal/Observable";

@Injectable()
export class CustomerService {
  constructor(private http: Http) {}

  getLists(listUrl): Observable<any> {
    return this.http.get(listUrl);
  }

  postCustomer(data) {
    let headers:Headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=UTF-8');

    return this.http.post('http://183.110.11.49/adm/customer', data, { headers: headers });
  }

  updateCustomer(newData) {
    let headers:Headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=UTF-8');

    return this.http.put('http://183.110.11.49/adm/customer', newData, { headers: headers });
  }
}