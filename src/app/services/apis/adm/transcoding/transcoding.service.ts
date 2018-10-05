/**
 * Created by GRE511 on 2018-07-25.
 */
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from "rxjs/internal/Observable";

@Injectable()
export class TranscodingService {
  constructor(private http: Http) {}

  getLists(listUrl): Observable<any> {
    return this.http.get(listUrl);
  }

  postData(url, data) {
    let headers:Headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=UTF-8');

    return this.http.post(url, data, { headers: headers });
  }

  updateData(url, newData) {
    let headers:Headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=UTF-8');

    return this.http.put(url, newData, { headers: headers });
  }
}