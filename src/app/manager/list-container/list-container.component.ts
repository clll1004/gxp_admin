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
  public filterCustomerLists: any[];
  public customerCols: any[];

  /*total row/page info*/
  public totalCustomerList: number = 0;
  public currentIndex: number = 0;
  public totalIndex: number = 0;
  public searchKey: string = '';

  constructor(private http: Http) { }

  ngOnInit() {
    this.getLists().subscribe((cont) => {
      this.customerLists = JSON.parse(cont._body).list;
      this.filterCustomerLists = this.customerLists;
      this.totalCustomerList = this.filterCustomerLists.length;
    });

    this.customerCols = [
      { field: 'cus_seq', header: 'No.', width: '5%' },
      { field: 'cus_nm_ko', header: '고객명(한글)', width: '18%' },
      { field: 'cus_nm_en', header: '고객명(영문)', width: '15%' },
      { field: 'cus_inchg_nm', header: '고객 담당자', width: '10%' },
      { field: 'cus_inchg_tel', header: '연락처', width: '15%' },
      { field: 'cus_use_yn', header: '사용여부', width: '8%' },
      { field: 'cus_test_yn', header: '테스트여부', width: '8%' },
      { field: 'cus_reg_dtm', header: '등록일', width: '16%' },
      { field: '', header: '관리', width: '10%' }
    ];
  }

  getLists(): Observable<any> {
    if(this.params['listId'] == 'customer') {
      return this.http.get('http://183.110.11.49/adm/customer/list?page=1&row=10000');
    }
  }

  /*사용유무 필터*/
  filterListUseAll() {
    this.filterCustomerLists = this.customerLists;
    this.totalCustomerList = this.filterCustomerLists.length;
  }
  filterListUse(data:boolean) {
    this.filterCustomerLists = this.customerLists.filter((customerItem) => {
      return customerItem.cus_use_yn === data;
    });
    this.totalCustomerList = this.filterCustomerLists.length;
  }

  /*고객명 검색*/
  filterCustomerName() {
    if(this.searchKey != '') {
      this.filterCustomerLists = [];
      this.customerLists.filter((customerItem) => {
        if(customerItem.cus_nm_ko.indexOf(this.searchKey)>=0) {
          this.filterCustomerLists.push(customerItem);
        }
      });
    }
    this.totalCustomerList = this.filterCustomerLists.length;
  }
}
