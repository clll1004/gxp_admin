/**
 * Created by GRE511 on 2018-07-12.
 */
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from "rxjs/internal/Observable";

@Injectable()
export class UserService {
  constructor(private http: Http) {}

  getLists(listUrl): Observable<any> {
    return this.http.get(listUrl);
  }

  postUser(data) {
    let headers:Headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    return this.http.post('http://183.110.11.49/adm/user', data, { headers: headers });
  }

  updateData(newData) {
    let headers:Headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    return this.http.put('http://183.110.11.49/adm/user', newData, { headers: headers });
  }
}