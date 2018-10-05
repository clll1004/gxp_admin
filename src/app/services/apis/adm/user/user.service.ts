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

  postUser(url:string, data) {
    let headers:Headers = new Headers();
    headers.append('Content-Type', 'application//json; charset=UTF-8');

    return this.http.post(url, data, { headers: headers });
  }

  updateUser(url:string, newData) {
    let headers:Headers = new Headers();
    headers.append('Content-Type', 'application//json; charset=UTF-8');

    return this.http.put(url, newData, { headers: headers });
  }
}