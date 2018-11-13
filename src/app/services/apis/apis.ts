/**
 * Created by GRE511 on 2018-07-25.
 */
import { Injectable } from '@angular/core';

@Injectable()
export class AdminApis {
  public domain = '';

  /* 로그인 */
  public login = this.domain + 'adm/login';
  /**** 공통 ****/
  /* 리스트 */
  public loadCustomerNames = this.domain + 'adm/common/list/customer';
  public loadGroupNames = this.domain + 'adm/common/list/group/';
  /* 중복확인 */
  public checkDupCustomerName = this.domain + 'adm/common/check/customernm/';
  public checkDupGroupName = this.domain + 'adm/common/check/groupnm/';
  public checkDupUserId = this.domain + 'adm/common/check/userid/';
  public checkDupTransServerIp = this.domain + 'adm/common/check/tserverip/';

  /**** MANAGER ****/
  /* 고객 관리 */
  public loadCustomerList = this.domain + 'adm/customer/list?page=1&row=10000';
  public loadCustomer = this.domain + 'adm/customer/';
  public postCustomer = this.domain + 'adm/customer';
  public updateCustomer = this.domain + 'adm/customer';

  /* 서비스 관리 */
  public loadToken = this.domain + 'adm/group/gettoken/';
  public loadServiceList = this.domain + 'adm/group/list?page=1&row=10000';
  public loadService = this.domain + 'adm/group/';
  // public postGroup = this.domain + 'adm/group';
  // public updateGroup = this.domain + 'adm/group';

  /* CMS 계정 관리 */
  public loadUserList = this.domain + 'adm/user/list?page=1&row=10000';
  public loadUser = this.domain + 'adm/user/';
  public postUser = this.domain + 'adm/user';
  public updateUser = this.domain + 'adm/user';

  /*API 인증키*/
  public loadApiList = this.domain + 'adm/group/token/list';

  /**** 트랜스코딩 ****/
  /* 실시간 서버 모니터링 */
  public loadServerIpList = this.domain + 'adm/transcoding/server/list/ip';
  public loadServerList = this.domain + 'adm/transcoding/server/list?page=1&row=10000';
  // public refreshServerIp = this.domain + 'adm/transcoding/server/refresh';
  public loadServer = this.domain + 'adm/transcoding/server/';
  public postServer = this.domain + 'adm/transcoding/server';
  public updateServer = this.domain + 'adm/transcoding/server';
  /* 변환 정보 */
  public loadTranscodingGroupNames = this.domain + 'adm/transcoding/list/group';
  public loadStandbyList = this.domain + 'adm/transcoding/list?page=1&row=10000&ft_status=U';
  public loadRequestList = this.domain + 'adm/transcoding/list?page=1&row=10000&ft_status=TR';
  public loadProgressList = this.domain + 'adm/transcoding/list?page=1&row=10000&ft_status=TT';
  public loadCompleteList = this.domain + 'adm/transcoding/list?page=1&row=10000&ft_status=SS';
  public loadDelayList = this.domain + 'adm/transcoding/list?page=1&row=10000&ft_status=TD';
  public loadFailList = this.domain + 'adm/transcoding/list?page=1&row=10000&ft_status=TF';
  public loadTempDeleteList = this.domain + 'adm/transcoding/list?page=1&row=10000&ft_status=DT';
  /* 변환 상태 변경 */
  public reStartTranscoding = this.domain + 'adm/transcoding/updateretry';
  public tempDeleteItem = this.domain + 'adm/transcoding/updatedeltemp';
  /* INI 조회 */
  // public loadINI = this.domain + 'adm/transcoding/ini';

  constructor() {
    if (process.env.NODE_ENV === 'development') {
      this.domain = 'https://api.gomgxp.com/';
    } else if (process.env.NODE_ENV === 'production') {
      this.domain = 'https://api.gomgxp.com/';
    }

    /* 로그인 */
    this.login = this.domain + 'adm/login';
    /**** 공통 ****/
    /* 리스트 */
    this.loadCustomerNames = this.domain + 'adm/common/list/customer';
    this.loadGroupNames = this.domain + 'adm/common/list/group/';
    /* 중복확인 */
    this.checkDupCustomerName = this.domain + 'adm/common/check/customernm/';
    this.checkDupGroupName = this.domain + 'adm/common/check/groupnm/';
    this.checkDupUserId = this.domain + 'adm/common/check/userid/';
    this.checkDupTransServerIp = this.domain + 'adm/common/check/tserverip/';

    /**** MANAGER ****/
    /* 고객 관리 */
    this.loadCustomerList = this.domain + 'adm/customer/list?page=1&row=10000';
    this.loadCustomer = this.domain + 'adm/customer/';
    this.postCustomer = this.domain + 'adm/customer';
    this.updateCustomer = this.domain + 'adm/customer';

    /* 서비스 관리 */
    this.loadToken = this.domain + 'adm/group/gettoken/';
    this.loadServiceList = this.domain + 'adm/group/list?page=1&row=10000';
    this.loadService = this.domain + 'adm/group/';
    // this.postGroup = this.domain + 'adm/group';
    // this.updateGroup = this.domain + 'adm/group';

    /* CMS 계정 관리 */
    this.loadUserList = this.domain + 'adm/user/list?page=1&row=10000';
    this.loadUser = this.domain + 'adm/user/';
    this.postUser = this.domain + 'adm/user';
    this.updateUser = this.domain + 'adm/user';

    /*API 인증키*/
    this.loadApiList = this.domain + 'adm/group/token/list';

    /**** 트랜스코딩 ****/
    /* 실시간 서버 모니터링 */
    this.loadServerIpList = this.domain + 'adm/transcoding/server/list/ip';
    this.loadServerList = this.domain + 'adm/transcoding/server/list?page=1&row=10000';
    // this.refreshServerIp = this.domain + 'adm/transcoding/server/refresh';
    this.loadServer = this.domain + 'adm/transcoding/server/';
    this.postServer = this.domain + 'adm/transcoding/server';
    this.updateServer = this.domain + 'adm/transcoding/server';
    /* 변환 정보 */
    this.loadTranscodingGroupNames = this.domain + 'adm/transcoding/list/group';
    this.loadStandbyList = this.domain + 'adm/transcoding/list?page=1&row=10000&ft_status=U';
    this.loadRequestList = this.domain + 'adm/transcoding/list?page=1&row=10000&ft_status=TR';
    this.loadProgressList = this.domain + 'adm/transcoding/list?page=1&row=10000&ft_status=TT';
    this.loadCompleteList = this.domain + 'adm/transcoding/list?page=1&row=10000&ft_status=SS';
    this.loadDelayList = this.domain + 'adm/transcoding/list?page=1&row=10000&ft_status=TD';
    this.loadFailList = this.domain + 'adm/transcoding/list?page=1&row=10000&ft_status=TF';
    this.loadTempDeleteList = this.domain + 'adm/transcoding/list?page=1&row=10000&ft_status=DT';
    /* 변환 상태 변경 */
    this.reStartTranscoding = this.domain + 'adm/transcoding/updateretry';
    this.tempDeleteItem = this.domain + 'adm/transcoding/updatedeltemp';
    /* INI 조회 */
    // this.loadINI = this.domain + 'adm/transcoding/ini';
  }
}
