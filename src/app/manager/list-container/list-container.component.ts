import { Component, Input, OnInit } from '@angular/core';
import { Observable } from "rxjs/internal/Observable";
import { Http } from "@angular/http";


@Component({
  selector: 'list-container',
  templateUrl: './list-container.component.html',
  styleUrls: ['./list-container.component.scss']
})

export class ListContainerComponent implements OnInit {
  @Input() params: object;
  @Input() pathName: string = '';

  public customerLists: any[];
  public customerCols: any[];

  public filterResult: any[] = [];

  constructor(private http: Http) { }

  ngOnInit() {
    this.getLists().subscribe((cont) => {
      this.customerLists = JSON.parse(cont._body).list;
    });

    this.customerCols = [
      { field: 'cus_seq', header: 'No.' },
      { field: 'cus_nm_ko', header: '고객명(한글)' },
      { field: 'cus_nm_en', header: '고객명(영문)' },
      { field: '', header: '그룹' },
      { field: 'cus_inchg_nm', header: '고객 담당자' },
      { field: 'cus_inchg_tel', header: '연락처' },
      { field: 'cus_use_yn', header: '사용여부' },
      { field: 'cus_test_yn', header: '테스트여부' },
      { field: 'cus_reg_dtm', header: '등록일' },
      { field: '', header: '관리' }
    ]
  }

  getLists(): Observable<any> {
    return this.http.get('http://183.110.11.49/adm/customer/list?page=1&row=10');
  }

  filteringAll() {

  }
  filteringUse() {
    for(let i in this.customerLists) {
      this.filterResult[i] = this.customerLists[i].cus_use_yn;
    }
    console.log(this.filterResult);
  }
  filteringDisuse() {

  }

}
