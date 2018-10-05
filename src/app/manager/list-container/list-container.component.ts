import { Component, Input, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { AdminApis } from '../../services/apis/apis';

@Component({
  selector: 'list-container',
  templateUrl: './list-container.component.html',
  styleUrls: ['./list-container.component.scss'],
  providers: [AdminApis]})

export class ListContainerComponent implements OnInit {
  @Input() params: object;

  public pathName:string = '';

  public customerLists: any[] = [];
  public filterCustomerLists: any[] = [];

  public customerCols: any[] = [
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
  public serviceCols: any[] = [
    { field: 'grp_seq', header: 'No.', width: '5%' },
    { field: 'grp_nm', header: '서비스명', width: '25%' },
    { field: 'cus_nm_ko', header: '고객명(한글)', width: '15%' },
    { field: 'grp_basic_yn', header: '기본서비스\n사용여부', width: '10%' },
    { field: 'grp_use_yn', header: '사용여부', width: '10%' },
    { field: 'grp_reg_dtm', header: '등록일', width: '8%' },
    { field: 'grp_upd_dtm', header: '수정일', width: '8%' },
    { field: '', header: '관리', width: '19%' }
  ];
  public accountCols: any[] = [
    { field: 'usr_seq', header: 'No.', width: '5%' },
    { field: 'usr_id', header: '아이디', width: '24%' },
    { field: 'cus_nm_ko', header: '고객명(한글)', width: '21%' },
    { field: 'usr_use_yn', header: '사용여부', width: '10%' },
    { field: 'usr_reg_dtm', header: '등록일', width: '17%' },
    { field: 'usr_upd_dtm', header: '수정일', width: '17%' },
    { field: '', header: '관리', width: '10%' }
  ];
  public authkeyCols: any[] = [
    { field: 'cus_seq', header: 'No.', width: '5%' },
    { field: 'cus_nm_ko', header: '고객명(한글)', width: '12%' },
    { field: 'grp_nm', header: '서비스명', width: '12%' },
    { field: 'authkey', header: '인증키', width: '20%' },
    { field: 'url', header: 'URL', width: '20%' },
    { field: 'sdate', header: '발급일', width: '10%' },
    { field: 'edate', header: '만료일', width: '10%' },
    { field: 'use_yn', header: '사용여부', width: '10%' },
    { field: 'updated_at', header: '최종 수정일시', width: '15%' },
  ];

  /*total row/page info*/
  public totalCustomerList: number = 0;
  public searchKey: string = '';

  constructor(private http: Http, private activatedRoute: ActivatedRoute, private adminApi: AdminApis) {}

  ngOnInit() {
    this.activatedRoute.url.subscribe((urlItem) => {
      this.customerLists = [];
      this.totalCustomerList = 0;
      this.searchKey = '';

      let url: string = '';
      if(urlItem[1]['path'] == 'customer') {
        this.pathName = '고객관리';
        url = this.adminApi.loadCustomerList;
      } else if (urlItem[1]['path'] == 'service') {
        this.pathName = '서비스관리';
        url = this.adminApi.loadServiceList;
      } else if (urlItem[1]['path'] == 'account') {
        this.pathName = 'CMS 계정관리';
        url = this.adminApi.loadUserList;
      } else if (urlItem[1]['path'] == 'authkey') {
        this.pathName = 'API 인증키관리';
        url = this.adminApi.loadApiList;
      }

      this.http.get(url)
        .toPromise()
        .then((cont) => {
          if (JSON.parse(cont['_body']).list !== 0) {
            this.customerLists = JSON.parse(cont['_body']).list;
            this.filterCustomerLists = this.customerLists;
            this.totalCustomerList = this.filterCustomerLists.length;

            this.setTableIndex();
          }
        })
        .catch((err) => {
          console.log(err);
        })
    });
  }

  /*사용유무 필터*/
  filterListUseAll() {
    this.filterCustomerLists = this.customerLists;
    this.totalCustomerList = this.filterCustomerLists.length;

    this.setTableIndex();
  }

  filterListUse(data:string) {
    this.filterCustomerLists = this.customerLists.filter((customerItem) => {
      if(this.params['listId'] === 'customer') {
        return customerItem.cus_use_yn === data;
      } else if(this.params['listId'] === 'service') {
        return customerItem.grp_use_yn === data;
      } else if(this.params['listId'] === 'account') {
        return customerItem.usr_use_yn === data;
      } else if(this.params['listId'] === 'authkey') {
        return customerItem.use_yn === data;
      }
    });
    this.totalCustomerList = this.filterCustomerLists.length;
    this.setTableIndex();
  }

  /*고객명 검색*/
  filterCustomerName() {
    if(this.searchKey != '') {
      this.filterCustomerLists = [];
      this.customerLists.filter((customerItem) => {
        if(customerItem.cus_nm_ko && (customerItem.cus_nm_ko.indexOf(this.searchKey)>=0)) {
          this.filterCustomerLists.push(customerItem);
        }
      });
      this.totalCustomerList = this.filterCustomerLists.length;
      this.setTableIndex();
    }
  }

  setTableIndex() {
    let num:number = 0;
    this.filterCustomerLists.forEach((item) => {
      num = num + 1;
      item.index = num;
    });
  }
}
