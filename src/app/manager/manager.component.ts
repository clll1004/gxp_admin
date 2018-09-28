import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'manager',
  templateUrl: './manager.component.html'})

export class ManagerComponent {
  public params:Params;
  public pathNames = {
    customer: {
      list: '고객 리스트',
      add: '고객 기본 그룹 생성',
      modify: '고객 정보 수정'
    },
    group: {
      list: '그룹 리스트',
      add: '그룹 등록',
      modify: '그룹 수정'
    },
    account: {
      list: 'CMS 계정 리스트',
      add: 'CMS 계정 발급',
      modify: 'CMS 계정 수정'
    }
  };
  public pathName: string = '';
  public isShow:boolean = true;

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe( (params) => {
      this.params = params;
    });

    this.activatedRoute.url.subscribe((urlItem) => {
      urlItem.length == 2 ? this.isShow = true : this.isShow = false;
    });
  }


}


