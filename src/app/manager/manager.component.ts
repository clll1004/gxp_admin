import { Component } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: 'manager',
  templateUrl: './manager.component.html',
})

export class ManagerComponent {
  public params:Params;
  public pathNames = {
    customer: '고객 리스트',
    group: '그룹 리스트',
    account: 'CMS 계정 리스트'
  };
  public pathName: string = '';

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe( (params) => {
      this.params = params;
      this.pathName = this.pathNames[this.params.id];
    });
  }
}


