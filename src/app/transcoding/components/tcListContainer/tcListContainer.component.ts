/**
 * Created by GRE511 on 2018-07-13.
 */
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranscodingService } from '../../../services/apis/adm/transcoding/transcoding.service';
import { AdminApis } from '../../../services/apis/apis';
import { ConfirmationService } from 'primeng/components/common/api';

@Component({
  selector: 'tcListContainer',
  templateUrl: './tcListContainer.component.html',
  styleUrls: ['../transcoding.component.scss'],
  providers: [ConfirmationService]})

export class TcListContainerComponent implements OnInit {
  @Input() params: object;
  @Input() pathName: string;
  public url: string = '';

  /*for dropdown*/
  public selectedGroupOptions: any[] = [];
  public selectedGroup: string;
  public selectedIPOptions: any[] = [];
  public selectedIP: any[];

  /*for Table*/
  public getTotalListLength: number = 0;
  public tcMonitoringLists: any[];
  public filterTcMonitoringLists: any[];
  public subMonitoringLists: any[];
  public searchKey: string = '';
  /*for Table Select*/
  public selectItems: any[];
  /*for Table Cols*/
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
    {field: 'ft_path', header: '원본 파일 경로', width: '25%'},
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
    {field: 'ft_path', header: '원본 파일 경로', width: '25%'},
    {field: 'ft_reg_dtm', header: '등록일', width: '20%'},
    {field: '', header: '관리', width: '10%'}
  ];
  public tcRequestCols = [
    {field: '', header: '', width: '5%'},
    {field: '', header: 'No', width: '5%'},
    {field: 'grp_nm', header: '그룹명', width: '25%'},
    {field: 'ft_path', header: '원본 파일 경로', width: '35%'},
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

  constructor(private activatedRoute: ActivatedRoute,
              private transcodingService: TranscodingService,
              private adminApis: AdminApis,
              private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.load();

      this.params = params;
      this.selectItems = [];
      this.getTotalListLength = 0;

      this.tcMonitoringLists = [];
      if (this.params['id'] === 'server') {
        this.url = this.adminApis.loadServerList;
      } else if (this.params['id'] === 'standby') {
        this.url = this.adminApis.loadStandbyList;
      } else if (this.params['id'] === 'request') {
        this.url = this.adminApis.loadRequestList;
      } else if (this.params['id'] === 'progress') {
        this.url = this.adminApis.loadProgressList;
      } else if (this.params['id'] === 'complete') {
        this.url = this.adminApis.loadCompleteList;
      } else if (this.params['id'] === 'delay') {
        this.url = this.adminApis.loadDelayList;
      } else if (this.params['id'] === 'fail') {
        this.url = this.adminApis.loadFailList;
      } else if (this.params['id'] === 'temp-delete') {
        this.url = this.adminApis.loadTempDeleteList;
      }

      this.transcodingService.getLists(this.url)
        .toPromise()
        .then((cont) => {
          this.tcMonitoringLists = JSON.parse(cont['_body']);
          this.filterTcMonitoringLists = this.tcMonitoringLists['list'];
          this.subMonitoringLists = this.tcMonitoringLists['trans'];

          this.tableInit();
        })
        .catch((error) => { console.log(error); });
    });
  }

  load() {
    this.params['id'] === 'server' ? this.loadIPList() : this.loadGroupList();
  }

  tableInit() {
    if(this.filterTcMonitoringLists) {
      this.getTotalListLength = this.filterTcMonitoringLists.length;
      this.setTableIndex();
    }
  }

  loadIPList() {
    this.selectedIPOptions = [];
    let list;
    this.transcodingService.getLists(this.adminApis.loadServerIpList)
      .toPromise()
      .then((params) => {
        list = JSON.parse(params["_body"]);
        list.forEach((item) => {
          item.label = item.ts_ip;
          item.value = item.ts_ip;
          this.selectedIPOptions.push(item);
        });
    });
  }

  loadGroupList() {
    this.selectedGroupOptions = [];
    this.selectedGroupOptions.push({label: '전체 그룹', value: 'allGroup'});
    this.transcodingService.getLists(this.adminApis.loadTranscodingGroupNames)
      .toPromise()
      .then((params) => {
        let list = JSON.parse(params["_body"]);
        list.forEach((item) => {
          item.label = item.grp_nm;
          item.value = item.grp_nm;
          this.selectedGroupOptions.push(item);
        });
    });
  }

  reloadSubTable() {
    this.transcodingService.getLists(this.url)
      .toPromise()
      .then((cont) => {
        this.tcMonitoringLists = JSON.parse(cont['_body']);
        this.subMonitoringLists = this.tcMonitoringLists['trans'];
      });
  }

  filterSearch() {
    if(!this.filterTcMonitoringLists) {
      return false;
    }
    this.filterTcMonitoringLists = [];
    this.tcMonitoringLists['list'].filter((item) => {
      if (this.selectedGroup === 'allGroup' && item.ft_path && (item.ft_path.indexOf(this.searchKey) >= 0)) {
        this.filterTcMonitoringLists.push(item);
      } else if (this.selectedGroup === 'allGroup' && !this.searchKey) {
        this.filterTcMonitoringLists.push(item);
      } else if (item.grp_nm && (item.grp_nm === this.selectedGroup) && item.ft_path && (item.ft_path.indexOf(this.searchKey) >= 0)) {
        this.filterTcMonitoringLists.push(item);
      } else if (item.grp_nm && (item.grp_nm === this.selectedGroup) && !this.searchKey) {
        this.filterTcMonitoringLists.push(item);
      } else if (!this.selectedGroup && item.ft_path && (item.ft_path.indexOf(this.searchKey) >= 0)) {
        this.filterTcMonitoringLists.push(item);
      }
    });
    this.tableInit();
  }

  filterIP() {
    if(!this.filterTcMonitoringLists || !this.selectedIP) {
      return false;
    }
    this.filterTcMonitoringLists = [];
    this.tcMonitoringLists['list'].filter((ipItem) => {
      if(ipItem.ts_ip === this.selectedIP) {
        this.filterTcMonitoringLists.push(ipItem);
      }
    });
    this.tableInit();
  }

  filterListUseAll() {
    if(!this.filterTcMonitoringLists) {
      return false;
    }
    this.filterTcMonitoringLists = this.tcMonitoringLists['list'];
    this.tableInit();
  }

  filterListUse(data:string) {
    if(!this.filterTcMonitoringLists) {
      return false;
    }
    this.filterTcMonitoringLists = [];
    this.tcMonitoringLists['list'].filter((ipItem) => {
      if(ipItem.ts_use_yn === data) {
        this.filterTcMonitoringLists.push(ipItem);
      }
    });
    this.tableInit();
  }

  refresh() {
    this.transcodingService.getLists(this.url)
      .toPromise()
      .then((cont) => {
        this.tcMonitoringLists = JSON.parse(cont['_body']);
        this.filterTcMonitoringLists = this.tcMonitoringLists['list'];
        this.subMonitoringLists = this.tcMonitoringLists['trans'];

        this.tableInit();
      })
      .catch((error) => { console.log(error); });
  }

  reStartSelectFiles() {
    if(this.selectItems.length) {
      this.confirmationService.confirm({
        message: '변환을 재시작 하시겠습니까?',
        accept: () => {
          let newItemArray:any[] = [];
          let itemObject:any = {};
          this.selectItems.forEach((item) => {
            itemObject = {};
            itemObject.ft_seq = item.ft_seq;
            itemObject.ft_status = item.ft_status;
            newItemArray.push(itemObject);
          });

          this.transcodingService.updateData(this.adminApis.reStartTranscoding, newItemArray)
            .toPromise()
            .then(() => {
              this.selectItems = [];
              this.refresh();
            })
            .catch((error) => { console.log(error); });
        }
      });
    }
  }

  deleteSelectFiles() {
    if(this.selectItems.length) {
      this.confirmationService.confirm({
        message: '삭제하시겠습니까?',
        accept: () => {
          let newItemArray: any[] = [];
          let itemObject: any = {};
          this.selectItems.forEach((item) => {
            itemObject = {};
            itemObject.ft_seq = item.ft_seq;
            itemObject.ft_status = item.ft_status;
            newItemArray.push(itemObject);
          });

          this.transcodingService.updateData(this.adminApis.tempDeleteItem, newItemArray)
            .toPromise()
            .then(() => {
              this.selectItems = [];
              this.refresh();
            })
            .catch((error) => {
              console.log(error);
            });
        }
      });
    }
  }

  setTableIndex() {
    let num:number = 0;
    this.filterTcMonitoringLists.forEach((item) => {
      num = num + 1;
      item.index = num;
    });
  }
}
