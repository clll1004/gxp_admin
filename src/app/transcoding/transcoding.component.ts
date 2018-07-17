/**
 * Created by GRE511 on 2018-07-12.
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: 'transcoding',
  templateUrl: './transcoding.component.html',
  styleUrls: ['./transcoding.component.scss']
})
export class TransCodingComponent implements OnInit {
  public params:Params;
  public isShow:boolean = true;
  /*for path*/
  public pagePath = {
    realTimeServerMT: '실시간 서버 모니터링',
    tcStandByMT: '변환 대기 모니터링',
    tcRequestMT: '변환 요청 모니터링',
    tcProgressMT: '변환 진행 모니터링',
    tcCompleteMT: '변환 완료 모니터링',
    tcDelayMT: '변환 지연 모니터링',
    tcFailMT: '변환 실패 모니터링',
    tempDeleteList: '임시 삭제 목록'
  };
  public pageName: string = '';

  constructor(private activatedRoute: ActivatedRoute) {
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe( (params) => {
      this.params = params;
      this.pageName = this.pagePath[this.params.id];
    });

    this.activatedRoute.url.subscribe((urlItem) => {
      urlItem.length == 2 ? this.isShow = true : this.isShow = false;
      // console.log(urlItem);
    });
  }
}
