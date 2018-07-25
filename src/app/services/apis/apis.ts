/**
 * Created by GRE511 on 2018-07-25.
 */
import { Injectable } from '@angular/core';

@Injectable()
export class AdminApis {
  public ip = 'http://183.110.11.49/';

  /* 로그인 */
  // public login = this.ip + 'adm/login';
  /**** 공통 ****/
  /* 리스트 */
  public loadCustomerNames = this.ip + 'adm/common/list/customer';
  public loadGroupNames = this.ip + 'adm/common/list/group/';
  /* 중복확인 */
  public checkDupCustomerName = this.ip + 'adm/common/check/userid/';
  public checkDupGroupName = this.ip + 'adm/common/check/groupnm/';
  public checkDupUserId = this.ip + 'adm/common/check/userid/';
  public checkDupTransServerIp = this.ip + 'adm/common/check/tserverip/';

  /**** MANAGER ****/
  /* 고객 관리 */
  public loadCustomerList = this.ip + 'adm/customer/list?page=1&row=10000';
  public loadCustomer = this.ip + 'adm/customer/';
  public postCustomer = this.ip + 'adm/customer';
  public updateCustomer = this.ip + 'adm/customer';

  /* 그룹 관리 */
  public loadGroupList = this.ip + 'adm/group/list?page=1&row=10000';
  public loadGroup = this.ip + 'adm/group/';
  public postGroup = this.ip + 'adm/group';
  public updateGroup = this.ip + 'adm/group';

  /* CMS 계정 관리 */
  public loadUserList = this.ip + 'adm/user/list?page=1&row=10000';
  public loadUser = this.ip + 'adm/user/';
  public postUser = this.ip + 'adm/user';
  public updateUser = this.ip + 'adm/user';

  /**** 트랜스코딩 ****/
  /* 실시간 서버 모니터링 */
  public loadServerIpList = this.ip + 'adm/transcoding/server/list/ip';
  public loadServerList = this.ip + 'adm/transcoding/server/list?page=1&row=10000';
  public refreshServerIp = this.ip + 'adm/transcoding/server/refresh';
  public loadServer = this.ip + 'adm/transcoding/server/';
  public postServer = this.ip + 'adm/transcoding/server';
  public updateServer = this.ip + 'adm/transcoding/server';
  /* 변환 정보 */
  public loadTranscodingGroupNames = this.ip + 'adm/transcoding/llist/group';
  public loadStandbyList = this.ip + 'adm/transcoding/list?page=1&row=10000&ft_status=U';
  public loadRequestList = this.ip + 'adm/transcoding/list?page=1&row=10000&ft_status=TR';
  public loadProgressList = this.ip + 'adm/transcoding/list?page=1&row=10000&ft_status=TT';
  public loadCompleteList = this.ip + 'adm/transcoding/list?page=1&row=10000&ft_status=TS';
  public loadDelayList = this.ip + 'adm/transcoding/list?page=1&row=10000&ft_status=TF';
  public loadFailList = this.ip + 'adm/transcoding/list?page=1&row=10000&ft_status=TO';
  public loadTempDeleteList = this.ip + 'adm/transcoding/list?page=1&row=10000&ft_status=DT';
  /* 변환 상태 변경 */
  public reStartTranscoding = this.ip + 'adm/transcoding/updateretry';
  public tempDeleteItem = this.ip + 'adm/transcoding/updatedeltemp';
  /* INI 조회 */
  public loadINI = this.ip + 'adm/transcoding/ini';

  constructor() {}

}
