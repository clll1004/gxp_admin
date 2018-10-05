/**
 * Created by GRE511 on 2018-07-11.
 */
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from "rxjs/internal/Observable";

@Injectable()
export class ServiceService {
  constructor(private http: Http) {}

  getLists(listUrl): Observable<any> {
    return this.http.get(listUrl);
  }

  postService(data) {
    let headers:Headers = new Headers();
    headers.append('Content-Type', 'application/json;');

    return this.http.post('http://183.110.11.49/adm/group', data, { headers: headers });
  }

  updateService(newData) {
    let headers:Headers = new Headers();
    headers.append('Content-Type', 'application/json;');

    return this.http.put('http://183.110.11.49/adm/group', newData, { headers: headers });
  }
}