/**
 * Created by GRE511 on 2018-07-25.
 */
import { Injectable } from '@angular/core';

@Injectable()
export class Apis {
  public ip = 'http://183.110.11.49/';

  /* 로그인 */
  public login = ip + 'adm/login';
  /**** 공통 ****/
  /* 리스트 */
  public loadCustomerNames = ip + 'adm/common/list/customer';
  public loadGroupNames = ip + 'adm/common/list/group/';
  /* 중복확인 */
  public checkDupCustomerName = ip + 'adm/common/check/userid/';
  public checkDupGroupName = ip + 'adm/common/check/groupnm/';
  public checkDupUserId = ip + 'adm/common/check/userid/';
  public checkDupTransServerIp = ip + 'adm/common/check/tserverip/';

  /**** MANAGER ****/
  /* 고객 관리 */
  public loadCustomerList = ip + 'adm/customer/list?page=1&row=10000';
  public loadCustomer = ip + 'adm/customer/';
  public postCustomer = ip + 'adm/customer';
  public updateCustomer = ip + 'adm/customer';

  /* 그룹 관리 */
  public loadGroupList = ip + 'adm/group/list?page=1&row=10000';
  public loadGroup = ip + 'adm/group/';
  public postGroup = ip + 'adm/group';
  public updateGroup = ip + 'adm/group';

  /* CMS 계정 관리 */
  public loadUserList = ip + 'adm/user/list?page=1&row=10000';
  public loadUser = ip + 'adm/user/';
  public postUser = ip + 'adm/user';
  public updateUser = ip + 'adm/user';

  /**** 트랜스코딩 ****/
  /* 실시간 서버 모니터링 */
  public loadServerIpList = ip + 'adm/transcoding/server/list/ip';
  public loadServerList = ip + 'adm/transcoding/server/list?page=1&row=10000';
  public refreshServerIp = ip + 'adm/transcoding/server/refresh';
  public loadServer = ip + 'adm/transcoding/server/';
  public postServer = ip + 'adm/transcoding/server';
  public updateServer = ip + 'adm/transcoding/server';
  /* 변환 정보 */
  public loadTranscodingGroupNames = ip + 'adm/transcoding/llist/group';
  public loadStandbyList = ip + 'adm/transcoding/list?page=1&row=10000&ft_status=U';
  public loadRequestList = ip + 'adm/transcoding/list?page=1&row=10000&ft_status=TR';
  public loadProgressList = ip + 'adm/transcoding/list?page=1&row=10000&ft_status=TT';
  public loadCompleteList = ip + 'adm/transcoding/list?page=1&row=10000&ft_status=TS';
  public loadDelayList = ip + 'adm/transcoding/list?page=1&row=10000&ft_status=TF';
  public loadFailList = ip + 'adm/transcoding/list?page=1&row=10000&ft_status=TO';
  public loadTempDeleteList = ip + 'adm/transcoding/list?page=1&row=10000&ft_status=DT';
  /* 변환 상태 변경 */
  public reStartTranscoding = ip + 'adm/transcoding/updateretry';
  public tempDeleteItem = ip + 'adm/transcoding/updatedeltemp';
  /* INI 조회 */
  public loadINI = ip + 'adm/transcoding/ini';

  constructor() {}

}
