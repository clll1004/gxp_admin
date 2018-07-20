/**
 * Created by GRE511 on 2018-07-13.
 */
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Http, Headers } from "@angular/http";

@Component({
  selector: 'tcListContainer',
  templateUrl: './tcListContainer.component.html',
  styleUrls: ['../transcoding.component.scss']
})

export class TcListContainerComponent implements OnInit {
  @Input() params: object;

  public url: string = '';
  public rowIndex: number = 1;

  /*for dropdown*/
  public selectedGroupOptions: any[] = [];
  public selectedGroup: any[];
  public selectedIPOptions: any[] = [];
  public selectedIP: any[];

  /*for Table*/
  public gettotalListLength: number = 0;

  public tcMonitoringLists: any[];
  public filterTcMonitoringLists: any[];
  public subMonitoringLists: any[];

  public selectItems: any[];
  public searchKey: string = '';

  public realTimeServerCols = [
  {field: '', header: '', width: '5%'},
  {field: '', header: 'No', width: '5%'},
  {field: 'ts_ip', header: '트랜스코딩 서버 IP', width: '24%'},
  {field: 'ts_type', header: '서버 용도', width: '10%'},
  // {field: '', header: '변환 진행 JOB 개수', width: '17%'},
  {field: 'ts_use_yn', header: '사용여부', width: '10%'},
  {field: 'ts_reg_dtm', header: '등록일', width: '18%'},
  {field: 'ts_upd_dtm', header: '수정일', width: '18%'},
  {field: '', header: '관리', width: '10%'}
];
  public realTimeJobCols = [
  {field: 'grp_nm', header: '그룹명', width: '15%'},
  {field: 'ft_path', header: '파일 경로', width: '25%'},
  {field: 'gto_nm', header: '변환 옵션', width: '10%'},
  {field: 'ft_progress', header: '진행율', width: '14%'},
  {field: 'ft_start_dtm', header: '변환시작일시', width: '13%'},
  {field: 'ft_end_dtm', header: '변환최종일시', width: '13%'},
  {field: '', header: '관리', width: '10%'}
];
  public tcStandByCols = [
    {field: '', header: '', width: '5%'},
    {field: '', header: 'No', width: '5%'},
    {field: 'grp_nm', header: '그룹명', width: '25%'},
    {field: 'ft_path', header: '파일 경로', width: '25%'},
    {field: 'ft_reg_dtm', header: '등록일', width: '20%'},
    {field: '', header: '관리', width: '10%'}
  ];
  public tcRequestCols = [
    {field: '', header: '', width: '5%'},
    {field: '', header: 'No', width: '5%'},
    {field: 'grp_nm', header: '그룹명', width: '25%'},
    {field: 'ft_path', header: '파일 경로', width: '35%'},
    {field: 'ft_reg_dtm', header: '등록일', width: '20%'},
    {field: '', header: '관리', width: '10%'}
  ];
  public tcProgressCols = [
    {field: '', header: '', width: '5%'},
    {field: '', header: 'No', width: '5%'},
    {field: 'grp_nm', header: '그룹명', width: '10%'},
    {field: 'ft_path', header: '파일 경로', width: '15%'},
    {field: 'gto_nm', header: '변환 옵션', width: '5%'},
    {field: 'ft_progress', header: '진행율', width: '9%'},
    {field: 'ft_ts_ip', header: '트랜스코딩서버 IP', width: '14%'},
    {field: 'ft_reg_dtm', header: '등록일', width: '9%'},
    {field: 'ft_start_dtm', header: '변환시작일시', width: '9%'},
    {field: 'ft_end_dtm', header: '변환최종일시', width: '9%'},
    {field: '', header: '관리', width: '10%'}
  ];
  public tcCompleteCols = [
    {field: '', header: '', width: '5%'},
    {field: '', header: 'No', width: '5%'},
    {field: 'grp_nm', header: '그룹명', width: '13%'},
    {field: 'ft_path', header: '파일 경로', width: '22%'},
    {field: 'ft_ts_ip', header: '트랜스코딩서버 IP', width: '15%'},
    {field: 'ft_reg_dtm', header: '등록일', width: '10%'},
    {field: 'ft_start_dtm', header: '변환시작일시', width: '10%'},
    {field: 'ft_end_dtm', header: '변환최종일시', width: '10%'},
    {field: '', header: '관리', width: '10%'}
  ];
  public tcDelayCols = [
    {field: '', header: '', width: '5%'},
    {field: '', header: 'No', width: '5%'},
    {field: 'grp_nm', header: '그룹명', width: '25%'},
    {field: 'ft_path', header: '파일 경로', width: '20%'},
    {field: 'ts_reg_dtm', header: '등록일', width: '20%'},
    {field: 'ts_upd_dtm', header: '수정일', width: '20%'},
    {field: '', header: '관리', width: '10%'}
  ];
  public tcFailCols = [
    {field: '', header: '', width: '5%'},
    {field: '', header: 'No', width: '5%'},
    {field: 'grp_nm', header: '그룹명', width: '10%'},
    {field: 'ft_path', header: '파일 경로', width: '20%'},
    {field: 'ft_ts_ip', header: '트랜스코딩서버 IP', width: '20%'},
    {field: 'ft_fail_cnt', header: '실패 횟수', width: '10%'},
    {field: 'ft_msg', header: '실패 메시지', width: '10%'},
    {field: 'ft_end_dtm', header: '변환최종일시', width: '10%'},
    {field: '', header: '관리', width: '10%'}
  ];
  public tempDeleteCols = [
    {field: '', header: '', width: '5%'},
    {field: '', header: 'No', width: '5%'},
    {field: 'grp_nm', header: '그룹명', width: '20%'},
    {field: 'ft_path', header: '파일 경로', width: '30%'},
    {field: 'ts_reg_dtm', header: '등록일', width: '10%'},
    {field: 'ft_start_dtm', header: '변환시작일시', width: '10%'},
    {field: 'ft_end_dtm', header: '변환최종일시', width: '10%'},
    {field: '', header: '관리', width: '10%'}
  ];

  constructor(private activatedRoute: ActivatedRoute, private http: Http) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.params = params;
      this.selectItems = [];
      this.gettotalListLength = 0;

      this.tcMonitoringLists = [];
      if (this.params['id'] === 'realTimeServerMT') {
        this.url = 'http://183.110.11.49/adm/transcoding/server/list?page=1&row=10000';
      } else if (this.params['id'] === 'tcStandByMT') {
        this.url = 'http://183.110.11.49/adm/transcoding/list?page=1&row=10000&ft_status=U';
      } else if (this.params['id'] === 'tcRequestMT') {
        this.url = 'http://183.110.11.49/adm/transcoding/list?page=1&row=10000&ft_status=TR';
      } else if (this.params['id'] === 'tcProgressMT') {
        this.url = 'http://183.110.11.49/adm/transcoding/list?page=1&row=10000&ft_status=TT';
      } else if (this.params['id'] === 'tcCompleteMT') {
        this.url = 'http://183.110.11.49/adm/transcoding/list?page=1&row=10000&ft_status=TS';
      } else if (this.params['id'] === 'tcDelayMT') {
        this.url = 'http://183.110.11.49/adm/transcoding/list?page=1&row=10000&ft_status=TF';
      } else if (this.params['id'] === 'tcFailMT') {
        this.url = 'http://183.110.11.49/adm/transcoding/list?page=1&row=10000&ft_status=TD';
      } else if (this.params['id'] === 'tempDeleteList') {
        this.url = 'http://183.110.11.49/adm/transcoding/list?page=1&row=10000&ft_status=DT';
      }

      this.http.get(this.url)
        .toPromise()
        .then((cont) => {
          this.tcMonitoringLists = JSON.parse(cont['_body']);
          this.filterTcMonitoringLists = this.tcMonitoringLists['list'];
          this.gettotalListLength = this.filterTcMonitoringLists.length;
          this.subMonitoringLists = this.tcMonitoringLists['trans'];

          this.setTableIndex();
        });

      this.load();
    });
  }

  load() {
    if (this.params['id'] === 'realTimeServerMT') {
      this.loadIPList();
    } else {
      this.loadGroupList();
    }
  }
  loadIPList() {
    this.selectedIPOptions = [];
    let list;
    this.http.get(this.url).subscribe((params)=>{
      list = JSON.parse(params["_body"]).list;
      list.forEach((item) => {
        item.label = item.ts_ip;
        item.value = item.ts_ip;
        this.selectedIPOptions.push(item);
      });
    });
  }
  loadGroupList() {
    this.selectedGroupOptions = [];
    let list;
    this.http.get(this.url).subscribe((params)=>{
      list = JSON.parse(params["_body"]).list;
      list.forEach((item) => {
        item.label = item.grp_nm;
        item.value = item.grp_nm;
        this.selectedGroupOptions.push(item);
      });
    });
  }
  reloadSubTable() {
    this.http.get(this.url)
      .toPromise()
      .then((cont) => {
        this.tcMonitoringLists = JSON.parse(cont['_body']);
        this.subMonitoringLists = this.tcMonitoringLists['trans'];
      });
  }

  filterSearch() {
    this.filterTcMonitoringLists = [];
    this.tcMonitoringLists['list'].filter((item) => {
      if (!this.searchKey && item.grp_nm && (item.grp_nm === this.selectedGroup)) {
        this.filterTcMonitoringLists.push(item);
      } else if (!this.selectedGroup && item.ft_path && (item.ft_path.indexOf(this.searchKey) >= 0)) {
        this.filterTcMonitoringLists.push(item);
      } else if(item.grp_nm && (item.grp_nm === this.selectedGroup) && item.ft_path && (item.ft_path.indexOf(this.searchKey) >= 0)) {
        this.filterTcMonitoringLists.push(item);
      }
    });
    this.gettotalListLength = this.filterTcMonitoringLists.length;
    this.setTableIndex();
  }
  filterIP() {
    this.filterTcMonitoringLists = [];
    this.tcMonitoringLists['list'].filter((ipItem) => {
      if(ipItem.ts_ip === this.selectedIP) {
        this.filterTcMonitoringLists.push(ipItem);
      }
    });
    this.gettotalListLength = this.filterTcMonitoringLists.length;
    this.setTableIndex();
  }
  filterListUseAll() {
    this.filterTcMonitoringLists = this.tcMonitoringLists['list'];
    this.gettotalListLength = this.filterTcMonitoringLists.length;
    this.setTableIndex();
  }
  filterListUse(data:string) {
    this.filterTcMonitoringLists = [];
    this.tcMonitoringLists['list'].filter((ipItem) => {
      if(ipItem.ts_use_yn === data) {
        this.filterTcMonitoringLists.push(ipItem);
      }
    });
    this.gettotalListLength = this.filterTcMonitoringLists.length;
    this.setTableIndex();
  }
  refresh() {
    window.location.reload();
  }

  onRowSelect() {

  }
  changeStatus() {
    let newItemArray:any[] = [];
    let itemObject:any = {};
    this.selectItems.forEach((item) => {
      itemObject = {};
      itemObject.ft_seq = item.ft_seq;
      newItemArray.push(itemObject);
    });
    this.updateTranscodingStatus(newItemArray);

    this.gettotalListLength = this.filterTcMonitoringLists.length;
    this.setTableIndex();
  }
  updateTranscodingStatus (newData) {
    let headers:Headers = new Headers();
    let statusUrl:string = '';
    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    if(this.params['id'] === 'tcFailMT') {
      statusUrl = 'http://183.110.11.49/adm/transcoding/updatedeltemp';
    } else {
      statusUrl = 'http://183.110.11.49/adm/transcoding/updateretry';
    }

    return this.http.put(statusUrl, newData, { headers: headers})
      .toPromise()
      .then(() => {window.location.reload();})
      .catch((error) => {
        console.log(error);
      });
  }

  setTableIndex() {
    let num:number = 0;
    this.filterTcMonitoringLists.forEach((item) => {
      num = num + 1;
      item.index = num;
    });
  }
}
