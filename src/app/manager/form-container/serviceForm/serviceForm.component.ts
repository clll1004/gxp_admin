import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ServiceService } from '../../../services/apis/adm/service/service.service';
import { AdminApis } from '../../../services/apis/apis';
import { DatePipe } from '@angular/common';
import { ConfirmationService } from 'primeng/components/common/api';

@Component({
  selector: 'serviceForm',
  templateUrl: './serviceForm.component.html',
  styleUrls: ['../form-container.component.scss'],
  providers: [ServiceService, AdminApis, DatePipe, ConfirmationService]})

export class ServiceFormComponent implements OnInit {
  params: Params;

  public serviceform: FormGroup;
  public customerList: any[]= [ ];
  public customerName: string;
  public submitted: boolean;
  public isShowMessage: boolean = false;

  public isSetAuthKey: boolean = false;
  public yearRange: string = `${new Date().getFullYear()}:${new Date().getFullYear() + 10}`;
  public localeObject: object = {
    firstDayOfWeek: 0,
    dayNamesMin: ['일','월','화','수','목','금','토'],
    monthNames: ['01','02','03','04','05','06','07','08','09','10','11','12'],
    today: 'Today',
    clear: 'Clear',
  };
  public minDate: Date = new Date();


  /*for check addpagebb row*/
  public isAddRow: boolean = true;
  public ableGroupName: boolean = false;
  public showGroupDupMsg: boolean = false;

  /*for dropdown*/
  public server_mode_options = [
    {label:'선택하세요', value:null},
    {label:'PASV', value: 'PASV'},
    {label:'ACTV', value: 'ACTV'}
  ];
  public grp_stream_svr_type_options = [
    {label:'선택하세요', value:null},
    {label:'gxp', value: 'gxp'},
    {label:'WOWZA', value: 'WOWZA'},
    {label:'etc', value: 'etc'}
  ];
  public gto_bitrate_mode_options =[
    {label:'선택하세요', value:null},
    {label:'CBR', value: 'CBR'},
    {label:'VBR', value: 'VBR'}
  ];
  public gto_frame_rate_options =[
    {label:'선택하세요', value:null},
    {label:'copy', value: 'copy'},
    {label:'29.97', value: '29.97'},
    {label:'27.97', value: '27.97'},
    {label:'25.97', value: '25.97'},
    {label:'23.97', value: '23.97'}
  ];

  public cus_seq_options: any[]= [ ];

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private serviceService: ServiceService,
              private adminApi: AdminApis,
              private datePipe: DatePipe,
              private confirmationService: ConfirmationService) {
    this.activatedRoute.params.subscribe( (params) => {
      this.params = params;
    });
  }

  ngOnInit() {
    this.activatedRoute.url.subscribe((urlItem) => {
      this.isAddRow = urlItem[2].path === 'add';

      this.load();
    });

    this.serviceform = this.formBuilder.group({
      authkey: this.formBuilder.group({
        'grp_seq': new FormControl(null),
        'authkey': new FormControl(null),
        'url': new FormControl(null),
        'sdate': new FormControl(new Date()),
        'edate': new FormControl(new Date()),
      }),
      preset: this.formBuilder.group({
        'grp_seq': new FormControl(null),
        'service_type': new FormControl('LMS'),
        'bookmark': new FormControl(true),
        'setting': new FormControl(true),
        'nextVideo': new FormControl(true),
        'playbackRate': new FormControl(true),
        'loopPortion': new FormControl(true),
        'fullscreen': new FormControl(true),
        'cinemaMode': new FormControl(true),
        'quality': new FormControl(true),
        'subtitle': new FormControl(true),
      }),
      grp: this.formBuilder.group({
        /*트랜스코딩 정보*/
        'grp_seq': new FormControl(null),
        // 'cus_seq': new FormControl(null),
        'grp_cus_seq': new FormControl(null),
        'grp_tcd_desc': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(50)])),
        'grp_nm': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(20)])),
        'grp_use_yn': new FormControl('Y', Validators.required),
        'grp_basic_yn': new FormControl('N', Validators.required),
        'grp_svc_domain': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(50)])),
        'grp_svc_sub_url': new FormControl(null, Validators.maxLength(50)),
        'grp_callback_url': new FormControl(null, Validators.maxLength(200)),
        'grp_smil_use_yn': new FormControl('N', Validators.required),
        'grp_autoresol_use_yn': new FormControl('N', Validators.required),
        'grp_file_suffix_use': new FormControl('Y', Validators.required),
        'grp_thm_make_yn': new FormControl('N', Validators.required),
        'grp_thm_domain': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(50)])),
        'grp_thm_interval': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(2)])),
        'grp_security_type': new FormControl('N', Validators.required),
        'grp_ftp_ip': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(15)])),
        'grp_ftp_port': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(5)])),
        'grp_ftp_id': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(20)])),
        'grp_ftp_pw': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(20)])),
        'grp_ftp_mode': new FormControl('PASV', Validators.compose([Validators.required, Validators.maxLength(50)])),
        'grp_ftp_bak_ip': new FormControl(null, Validators.maxLength(15)),
        'grp_stream_svr_type': new FormControl('gxp', Validators.compose([Validators.required, Validators.maxLength(5)]))
      }),
      thm: this.formBuilder.array([
        this.formBuilder.group({
          'gts_seq': new FormControl(null),
          'gts_ftp_ip': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(15)])),
          'gts_ftp_port': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(5)])),
          'gts_ftp_id': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(20)])),
          'gts_ftp_pw': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(20)])),
          'gts_ftp_mode': new FormControl('PASV', Validators.compose([Validators.required, Validators.maxLength(50)]))
        })
      ]),
      tcd: this.formBuilder.array([
        this.formBuilder.group({
          opt: this.formBuilder.group({
            /*트랜스코딩 변환옵션*/
            'gto_seq': new FormControl(null),
            'gto_use_yn': new FormControl('Y', Validators.required),
            'gto_nm': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(10)])),
            'gto_desc': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(4)])),
            'gto_file_suffix': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(10)])),
            'gto_file_container': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(5)])),
            'gto_video_bitrate': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(5)])),
            'gto_audio_bitrate': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(5)])),
            'gto_max_bitrate': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(6)])),
            'gto_video_rsvopt': new FormControl(null, Validators.maxLength(100)),
            'gto_audio_rsvopt': new FormControl(null, Validators.maxLength(100)),
            'gto_dst_width': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(5)])),
            'gto_dst_height': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(5)])),
            'gto_video_aspect': new FormControl('AUTO', Validators.compose([Validators.required, Validators.maxLength(8)])),
            'gto_main': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(5)])),
            'gto_baseline': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(3)])),
            'gto_high': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(3)])),
            'gto_bitrate_mode': new FormControl('CBR', Validators.compose([Validators.required, Validators.maxLength(3)])),
            'gto_sharpen': new FormControl(null, Validators.maxLength(20)),
            'gto_refs': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(3)])),
            'gto_frame_rate': new FormControl('29.97', Validators.compose([Validators.required, Validators.maxLength(5)])),
            'gto_static_use': new FormControl('N', Validators.required),
            'gto_static_encode': new FormControl({value: null, disabled: true}, Validators.compose([Validators.required, Validators.maxLength(400)])),
            'gto_drm': new FormControl('N', Validators.required),
            'gto_drm_encode': new FormControl({value: null, disabled: true}, Validators.compose([Validators.required, Validators.maxLength(10)]))
          }),
          svc: this.formBuilder.array([
            this.formBuilder.group({
              'gss_seq': new FormControl(null),
              'gss_ftp_ip': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(15)])),
              'gss_ftp_port': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(5)])),
              'gss_ftp_id': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(20)])),
              'gss_ftp_pw': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(20)])),
              'gss_ftp_mode': new FormControl('PASV', Validators.compose([Validators.required, Validators.maxLength(50)]))
            })
          ])
        })
      ])
    });
    this.setPresetLabel();
  }

  onSubmit(formObject: any) {
    let valueObject = {};
    this.submitted = true;
    formObject.authkey.sdate = this.datePipe.transform(formObject.authkey.sdate, 'yyyy-MM-dd');
    formObject.authkey.edate = this.datePipe.transform(formObject.authkey.edate, 'yyyy-MM-dd');
    const preset = formObject['preset'];
    preset.bookmark = preset.bookmark || preset.bookmark === 'Y' ? 'Y' : 'N';
    preset.setting = preset.setting || preset.setting === 'Y' ? 'Y' : 'N';
    preset.nextVideo = preset.nextVideo || preset.nextVideo === 'Y' ? 'Y' : 'N';
    preset.playbackRate = preset.playbackRate || preset.playbackRate === 'Y' ? 'Y' : 'N';
    preset.loopPortion = preset.loopPortion || preset.loopPortion === 'Y' ? 'Y' : 'N';
    preset.fullscreen = preset.fullscreen || preset.fullscreen === 'Y' ? 'Y' : 'N';
    preset.cinemaMode = preset.cinemaMode || preset.cinemaMode === 'Y' ? 'Y' : 'N';
    preset.quality = preset.quality || preset.quality === 'Y' ? 'Y' : 'N';
    preset.subtitle = preset.subtitle || preset.subtitle === 'Y' ? 'Y' : 'N';

    if(this.isAddRow) {
      Object.entries(formObject).forEach((item:any) => {
        if(item[0] === 'tcd') {
          item[1].forEach((optItem) => {
            if(optItem.opt.gto_drm_encode) {
              optItem.opt.gto_drm = optItem.opt.gto_drm_encode;
            }
          });
        }
      });
      valueObject = formObject;
      Object.entries(valueObject).forEach((item:any) => {
        if(item[0] === 'tcd') {
          item[1].forEach((optItem) => {
            if(optItem.opt.gto_drm_encode) {
              delete optItem.opt.gto_drm_encode;
            }
          })
        }
      });
      this.serviceService.postService(valueObject)
        .toPromise()
        .then(() => {
          this.confirmationService.confirm({
            message: '등록 완료되었습니다.',
            accept: () => {
              this.router.navigate(['/manager', 'service']);
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });

    } else {
      Object.entries(formObject).forEach((item:any) => {
        if(item[0] === 'tcd') {
          item[1].forEach((optItem) => {
            if(optItem.opt.gto_drm_encode) {
              optItem.opt.gto_drm = optItem.opt.gto_drm_encode;
            }
          });
        }
      });
      valueObject = formObject;
      Object.entries(valueObject).forEach((item:any) => {
        if(item[0] === 'tcd') {
          item[1].forEach((optItem) => {
            if(optItem.opt.gto_drm_encode) {
              delete optItem.opt.gto_drm_encode;
            }
          })
        }
      });
      delete valueObject['grp'].grp_cus_seq;
      this.serviceService.updateService(valueObject)
        .toPromise()
        .then(() => {
          this.isShowMessage = true;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  goList() {
    this.router.navigate(['/manager', 'service']);
  }

  load() {
    if(this.isAddRow) {
      this.loadCustomerList();
    } else {
      this.loadServiceList();
    }
  }

  loadCustomerList() {
    let list;
    this.serviceService.getLists(this.adminApi.loadCustomerNames)
      .toPromise()
      .then((params)=>{
        list = JSON.parse(params._body);
        list.forEach((item) => {
          item.label = item.cus_nm_ko;
          item.value = item.cus_seq;
          this.cus_seq_options.push(item);
        });
    });
  }

  loadServiceList() {
    this.serviceService.getLists(this.adminApi.loadService + this.params.index)
      .toPromise()
      .then((data) => {
        const getData = JSON.parse((<any>data)._body);
        /*load serviceform grp*/
        this.customerName = getData.grp['cus_nm_ko'];
        this.serviceform.get('authkey').get('grp_seq').setValue(getData.authkey['grp_seq']);
        this.serviceform.get('authkey').get('authkey').setValue(getData.authkey['authkey']);
        this.serviceform.get('authkey').get('url').setValue(getData.authkey['url']);
        this.serviceform.get('authkey').get('sdate').setValue(new Date(getData.authkey['sdate']));
        this.serviceform.get('authkey').get('edate').setValue(new Date(getData.authkey['edate']));

        this.serviceform.get('preset').get('grp_seq').setValue(getData.preset['grp_seq']);
        this.serviceform.get('preset').get('service_type').setValue(getData.preset['service_type']);
        this.serviceform.get('preset').get('bookmark').setValue(getData.preset['bookmark'] === 'Y');
        this.serviceform.get('preset').get('playbackRate').setValue(getData.preset['playbackRate'] === 'Y');
        this.serviceform.get('preset').get('loopPortion').setValue(getData.preset['loopPortion'] === 'Y');
        this.serviceform.get('preset').get('nextVideo').setValue(getData.preset['nextVideo'] === 'Y');
        this.serviceform.get('preset').get('setting').setValue(getData.preset['setting'] === 'Y');
        this.serviceform.get('preset').get('fullscreen').setValue(getData.preset['fullscreen'] === 'Y');
        this.serviceform.get('preset').get('cinemaMode').setValue(getData.preset['cinemaMode'] === 'Y');
        this.serviceform.get('preset').get('quality').setValue(getData.preset['quality'] === 'Y');

        this.serviceform.get('grp').get('grp_nm').setValue(getData.grp['grp_nm']);
        this.serviceform.get('grp').get('grp_seq').setValue(getData.grp['grp_seq']);
        this.serviceform.get('grp').get('grp_cus_seq').setValue(getData.grp['grp_cus_seq']);
        this.serviceform.get('grp').get('grp_tcd_desc').setValue(getData.grp['grp_tcd_desc']);
        this.serviceform.get('grp').get('grp_basic_yn').setValue(getData.grp['grp_basic_yn']);
        this.serviceform.get('grp').get('grp_use_yn').setValue(getData.grp['grp_use_yn']);
        this.serviceform.get('grp').get('grp_svc_domain').setValue(getData.grp['grp_svc_domain']);
        this.serviceform.get('grp').get('grp_svc_sub_url').setValue(getData.grp['grp_svc_sub_url']);
        this.serviceform.get('grp').get('grp_callback_url').setValue(getData.grp['grp_callback_url']);
        this.serviceform.get('grp').get('grp_smil_use_yn').setValue(getData.grp['grp_smil_use_yn']);
        this.serviceform.get('grp').get('grp_autoresol_use_yn').setValue(getData.grp['grp_autoresol_use_yn']);
        this.serviceform.get('grp').get('grp_file_suffix_use').setValue(getData.grp['grp_file_suffix_use']);
        this.serviceform.get('grp').get('grp_thm_make_yn').setValue(getData.grp['grp_thm_make_yn']);
        this.serviceform.get('grp').get('grp_thm_domain').setValue(getData.grp['grp_thm_domain']);
        this.serviceform.get('grp').get('grp_thm_interval').setValue(getData.grp['grp_thm_interval']);
        this.serviceform.get('grp').get('grp_security_type').setValue(getData.grp['grp_security_type']);
        this.serviceform.get('grp').get('grp_ftp_ip').setValue(getData.grp['grp_ftp_ip']);
        this.serviceform.get('grp').get('grp_ftp_port').setValue(getData.grp['grp_ftp_port']);
        this.serviceform.get('grp').get('grp_ftp_id').setValue(getData.grp['grp_ftp_id']);
        this.serviceform.get('grp').get('grp_ftp_pw').setValue(getData.grp['grp_ftp_pw']);
        this.serviceform.get('grp').get('grp_ftp_mode').setValue(getData.grp['grp_ftp_mode']);
        this.serviceform.get('grp').get('grp_ftp_bak_ip').setValue(getData.grp['grp_ftp_bak_ip']);
        this.serviceform.get('grp').get('grp_stream_svr_type').setValue(getData.grp['grp_stream_svr_type']);
        /*load serviceform thm*/
        getData.thm.forEach((item) => {
          (<FormArray>this.serviceform.get('thm')).push(
            this.formBuilder.group({
              'gts_seq': new FormControl(item.gts_seq),
              'gts_ftp_ip': new FormControl(item.gts_ftp_ip, Validators.compose([Validators.required, Validators.maxLength(15)])),
              'gts_ftp_port': new FormControl(item.gts_ftp_port, Validators.compose([Validators.required, Validators.maxLength(5)])),
              'gts_ftp_id': new FormControl(item.gts_ftp_id, Validators.compose([Validators.required, Validators.maxLength(20)])),
              'gts_ftp_pw': new FormControl(item.gts_ftp_pw, Validators.compose([Validators.required, Validators.maxLength(20)])),
              'gts_ftp_mode': new FormControl(item.gts_ftp_mode, Validators.compose([Validators.required, Validators.maxLength(50)]))
            })
          )
        });
        (<FormArray>this.serviceform.get('thm')).removeAt(0);
        /*load serviceform tcd*/
        getData.tcd.forEach((tcdItem) => {
          const optFormBuilderItem = this.formBuilder.group({
            /*트랜스코딩 변환옵션*/
            'gto_seq': new FormControl(tcdItem.opt.gto_seq),
            'gto_use_yn': new FormControl(tcdItem.opt.gto_use_yn, Validators.required),
            'gto_nm': new FormControl(tcdItem.opt.gto_nm, Validators.compose([Validators.required, Validators.maxLength(10)])),
            'gto_desc': new FormControl(tcdItem.opt.gto_desc, Validators.compose([Validators.required, Validators.maxLength(4)])),
            'gto_file_suffix': new FormControl(tcdItem.opt.gto_file_suffix, Validators.compose([Validators.required, Validators.maxLength(10)])),
            'gto_file_container': new FormControl(tcdItem.opt.gto_file_container, Validators.compose([Validators.required, Validators.maxLength(5)])),
            'gto_video_bitrate': new FormControl(tcdItem.opt.gto_video_bitrate, Validators.compose([Validators.required, Validators.maxLength(5)])),
            'gto_audio_bitrate': new FormControl(tcdItem.opt.gto_audio_bitrate, Validators.compose([Validators.required, Validators.maxLength(5)])),
            'gto_max_bitrate': new FormControl(tcdItem.opt.gto_max_bitrate, Validators.compose([Validators.required, Validators.maxLength(6)])),
            'gto_video_rsvopt': new FormControl(tcdItem.opt.gto_video_rsvopt, Validators.maxLength(100)),
            'gto_audio_rsvopt': new FormControl(tcdItem.opt.gto_audio_rsvopt, Validators.maxLength(100)),
            'gto_dst_width': new FormControl(tcdItem.opt.gto_dst_width, Validators.compose([Validators.required, Validators.maxLength(5)])),
            'gto_dst_height': new FormControl(tcdItem.opt.gto_dst_height, Validators.compose([Validators.required, Validators.maxLength(5)])),
            'gto_video_aspect': new FormControl(tcdItem.opt.gto_video_aspect, Validators.compose([Validators.required, Validators.maxLength(8)])),
            'gto_main': new FormControl(tcdItem.opt.gto_main, Validators.compose([Validators.required, Validators.maxLength(5)])),
            'gto_baseline': new FormControl(tcdItem.opt.gto_baseline, Validators.compose([Validators.required, Validators.maxLength(3)])),
            'gto_high': new FormControl(tcdItem.opt.gto_high, Validators.compose([Validators.required, Validators.maxLength(3)])),
            'gto_bitrate_mode': new FormControl(tcdItem.opt.gto_bitrate_mode, Validators.compose([Validators.required, Validators.maxLength(3)])),
            'gto_sharpen': new FormControl(tcdItem.opt.gto_sharpen, Validators.maxLength(20)),
            'gto_refs': new FormControl(tcdItem.opt.gto_refs, Validators.compose([Validators.required, Validators.maxLength(3)])),
            'gto_frame_rate': new FormControl(tcdItem.opt.gto_frame_rate, Validators.compose([Validators.required, Validators.maxLength(5)])),
            'gto_static_use': new FormControl(tcdItem.opt.gto_static_use, Validators.required),
            'gto_static_encode': new FormControl(tcdItem.opt.gto_static_encode, Validators.compose([Validators.required, Validators.maxLength(400)])),
            'gto_drm': new FormControl(tcdItem.opt.gto_drm, Validators.compose([Validators.required, Validators.maxLength(10)])),
            'gto_drm_encode': new FormControl({value: null, disabled: true}, Validators.compose([Validators.required, Validators.maxLength(10)]))
          });
          if(optFormBuilderItem.get('gto_static_use').value !== 'X') {
            optFormBuilderItem.get('gto_static_encode').disable();
            optFormBuilderItem.get('gto_static_encode').setValue(null);
          }
          if(optFormBuilderItem.get('gto_drm').value !== 'N' && optFormBuilderItem.get('gto_drm').value !== 'INKA') {
            optFormBuilderItem.get('gto_drm_encode').enable();
            optFormBuilderItem.get('gto_drm_encode').setValue(optFormBuilderItem.get('gto_drm').value);
            optFormBuilderItem.get('gto_drm').setValue('X');
          }

          const svcFormBuilderItem = this.formBuilder.array([]);
          tcdItem.svc.forEach((svcItem) => {
            (<FormArray>svcFormBuilderItem).push(
              this.formBuilder.group({
                'gss_seq': new FormControl(svcItem.gss_seq),
                'gss_ftp_ip': new FormControl(svcItem.gss_ftp_ip, Validators.compose([Validators.required, Validators.maxLength(15)])),
                'gss_ftp_port': new FormControl(svcItem.gss_ftp_port, Validators.compose([Validators.required, Validators.maxLength(5)])),
                'gss_ftp_id': new FormControl(svcItem.gss_ftp_id, Validators.compose([Validators.required, Validators.maxLength(20)])),
                'gss_ftp_pw': new FormControl(svcItem.gss_ftp_pw, Validators.compose([Validators.required, Validators.maxLength(20)])),
                'gss_ftp_mode': new FormControl(svcItem.gss_ftp_mode, Validators.compose([Validators.required, Validators.maxLength(50)]))
              })
            );

          });

          const item = this.formBuilder.group({
            opt: optFormBuilderItem,
            svc: svcFormBuilderItem
          });

          (<FormArray>this.serviceform.get('tcd')).push(item);
        });
        (<FormArray>this.serviceform.get('tcd')).removeAt(0);

        this.setPresetLabel();
      });
  }

  setPresetLabel() {
    if (this.serviceform.get('preset').get('bookmark').value) {
      document.getElementById('bookmark_label').setAttribute('class', 'on');
      document.getElementById('bookmarkImg').style.display = 'block';
    } else {
      document.getElementById('bookmark_label').setAttribute('class', '');
      document.getElementById('bookmarkImg').style.display = 'none';
    }
    if (this.serviceform.get('preset').get('setting').value) {
      document.getElementById('setting_label').setAttribute('class', 'on');
      document.getElementById('settingImg').style.display = 'block';
    } else {
      document.getElementById('setting_label').setAttribute('class', '');
      document.getElementById('settingImg').style.display = 'none';
    }
    if (this.serviceform.get('preset').get('nextVideo').value) {
      document.getElementById('nextVideo_label').setAttribute('class', 'on');
      document.getElementById('nextVideoImg').style.display = 'block';
    } else {
      document.getElementById('nextVideo_label').setAttribute('class', '');
      document.getElementById('nextVideoImg').style.display = 'none';
    }
    if (this.serviceform.get('preset').get('playbackRate').value) {
      document.getElementById('playbackRate_label').setAttribute('class', 'on');
      document.getElementById('playbackRateImg').style.display = 'block';
    } else {
      document.getElementById('playbackRate_label').setAttribute('class', '');
      document.getElementById('playbackRateImg').style.display = 'none';
    }
    if (this.serviceform.get('preset').get('loopPortion').value) {
      document.getElementById('loopPortion_label').setAttribute('class', 'on');
      document.getElementById('loopPortionImg').style.display = 'block';
    } else {
      document.getElementById('loopPortion_label').setAttribute('class', '');
      document.getElementById('loopPortionImg').style.display = 'none';
    }
    if (this.serviceform.get('preset').get('fullscreen').value) {
      document.getElementById('fullscreen_label').setAttribute('class', 'on');
      document.getElementById('fullscreenImg').style.display = 'block';
    } else {
      document.getElementById('fullscreen_label').setAttribute('class', '');
      document.getElementById('fullscreenImg').style.display = 'none';
    }
    if (this.serviceform.get('preset').get('cinemaMode').value) {
      document.getElementById('cinemaMode_label').setAttribute('class', 'on');
      document.getElementById('cinemaModeImg').style.display = 'block';
    } else {
      document.getElementById('cinemaMode_label').setAttribute('class', '');
      document.getElementById('cinemaModeImg').style.display = 'none';
    }
    if (this.serviceform.get('preset').get('quality').value) {
      document.getElementById('quality_label').setAttribute('class', 'on');
      document.getElementById('qualityImg').style.display = 'block';
    } else {
      document.getElementById('quality_label').setAttribute('class', '');
      document.getElementById('qualityImg').style.display = 'none';
    }
    if (this.serviceform.get('preset').get('subtitle').value) {
      document.getElementById('subtitle_label').setAttribute('class', 'on');
      // document.getElementById('subtitleImg').style.display = 'block';
    } else {
      document.getElementById('subtitle_label').setAttribute('class', '');
      // document.getElementById('subtitleImg').style.display = 'none';
    }
  }

  setPlayerPreset(e) {
    const target = e.currentTarget;
    target.getAttribute('class') === 'on' ? target.setAttribute('class', '') : target.setAttribute('class', 'on');
    switch (target.id) {
      case 'bookmark_label':
        if (this.serviceform.get('preset').get('bookmark').value) {
          this.serviceform.get('preset').get('bookmark').setValue(false);
          document.getElementById('bookmarkImg').style.display = 'none';
        } else {
          this.serviceform.get('preset').get('bookmark').setValue(true);
          document.getElementById('bookmarkImg').style.display = 'block';
        }
        break;
      case 'setting_label':
        if (this.serviceform.get('preset').get('setting').value) {
          this.serviceform.get('preset').get('setting').setValue(false);
          document.getElementById('settingImg').style.display = 'none';
        } else {
          this.serviceform.get('preset').get('setting').setValue(true);
          document.getElementById('settingImg').style.display = 'block';
        }
        break;
      case 'nextVideo_label':
        if (this.serviceform.get('preset').get('nextVideo').value) {
          this.serviceform.get('preset').get('nextVideo').setValue(false);
          document.getElementById('nextVideoImg').style.display = 'none';
        } else {
          this.serviceform.get('preset').get('nextVideo').setValue(true);
          document.getElementById('nextVideoImg').style.display = 'block';
        }
        break;
      case 'playbackRate_label':
        if (this.serviceform.get('preset').get('playbackRate').value) {
          this.serviceform.get('preset').get('playbackRate').setValue(false);
          document.getElementById('playbackRateImg').style.display = 'none';
        } else {
          this.serviceform.get('preset').get('playbackRate').setValue(true);
          document.getElementById('playbackRateImg').style.display = 'block';
        }
        break;
      case 'loopPortion_label':
        if (this.serviceform.get('preset').get('loopPortion').value) {
          this.serviceform.get('preset').get('loopPortion').setValue(false);
          document.getElementById('loopPortionImg').style.display = 'none';
        } else {
          this.serviceform.get('preset').get('loopPortion').setValue(true);
          document.getElementById('loopPortionImg').style.display = 'block';
        }
        break;
      case 'fullscreen_label':
        if (this.serviceform.get('preset').get('fullscreen').value) {
          this.serviceform.get('preset').get('fullscreen').setValue(false);
          document.getElementById('fullscreenImg').style.display = 'none';
        } else {
          this.serviceform.get('preset').get('fullscreen').setValue(true);
          document.getElementById('fullscreenImg').style.display = 'block';
        }
        break;
      case 'cinemaMode_label':
        if (this.serviceform.get('preset').get('cinemaMode').value) {
          this.serviceform.get('preset').get('cinemaMode').setValue(false);
          document.getElementById('cinemaModeImg').style.display = 'none';
        } else {
          this.serviceform.get('preset').get('cinemaMode').setValue(true);
          document.getElementById('cinemaModeImg').style.display = 'block';
        }
        break;
      case 'quality_label':
        if (this.serviceform.get('preset').get('quality').value) {
          this.serviceform.get('preset').get('quality').setValue(false);
          document.getElementById('qualityImg').style.display = 'none';
        } else {
          this.serviceform.get('preset').get('quality').setValue(true);
          document.getElementById('qualityImg').style.display = 'block';
        }
        break;
      case 'subtitle_label':
        if (this.serviceform.get('preset').get('subtitle').value) {
          this.serviceform.get('preset').get('subtitle').setValue(false);
          // document.getElementById('subtitleImg').style.display = 'none';
        } else {
          this.serviceform.get('preset').get('subtitle').setValue(true);
          // document.getElementById('subtitleImg').style.display = 'block';
        }
        break;
    }
  }

  /*중복확인 - 그룹명*/
  confirmGroupName() {
    this.showGroupDupMsg = true;
    const inputname:string = this.serviceform.get('grp').value['grp_nm'];
    this.serviceService.getLists(this.adminApi.checkDupGroupName + inputname)
      .toPromise()
      .then((cont) => {
        this.ableGroupName = cont._body === 'true';
      });
  }

  setAuthkey() {
    this.isSetAuthKey = true;
    const grp_seq = this.isAddRow ? 0 : this.serviceform.get('grp').get('grp_seq').value;
    const authkey = this.serviceform.get('authkey').get('authkey');
    const btn = document.getElementById('authkey_btn');
    this.serviceService.getLists(this.adminApi.loadToken + grp_seq)
      .toPromise()
      .then((token) => {
        authkey.setValue(JSON.parse(token._body).token);
        btn.style.background = '#ddd';
        btn.style.cursor = 'default';
      });
  }

  /*썸네일서버 - 추가, 삭제*/
  addThumbnailServer() {
    (<FormArray>this.serviceform.get('thm')).push(
      this.formBuilder.group({
        'gts_ftp_ip': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(15)])),
        'gts_ftp_port': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(5)])),
        'gts_ftp_id': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(20)])),
        'gts_ftp_pw': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(20)])),
        'gts_ftp_mode': new FormControl('PASV', Validators.compose([Validators.required, Validators.maxLength(50)]))
      })
    );
  }

  removeThumbnailServer(index) {
    const thmList = <FormArray>this.serviceform.get('thm');
    thmList.removeAt(index);
  }

  /*트랜스코딩 변환옵션 - 추가, 삭제*/
  addTranscodingOption() {
    (<FormArray>this.serviceform.get('tcd')).push(
      this.formBuilder.group({
        opt: this.formBuilder.group({
          /*트랜스코딩 변환옵션*/
          'gto_use_yn': new FormControl('Y', Validators.required),
          'gto_nm': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(10)])),
          'gto_desc': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(4)])),
          'gto_file_suffix': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(10)])),
          'gto_file_container': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(5)])),
          'gto_video_bitrate': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(5)])),
          'gto_audio_bitrate': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(5)])),
          'gto_max_bitrate': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(6)])),
          'gto_video_rsvopt': new FormControl(null, Validators.maxLength(100)),
          'gto_audio_rsvopt': new FormControl(null, Validators.maxLength(100)),
          'gto_dst_width': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(5)])),
          'gto_dst_height': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(5)])),
          'gto_video_aspect': new FormControl('AUTO', Validators.compose([Validators.required, Validators.maxLength(8)])),
          'gto_main': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(5)])),
          'gto_baseline': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(3)])),
          'gto_high': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(3)])),
          'gto_bitrate_mode': new FormControl('CBR', Validators.compose([Validators.required, Validators.maxLength(3)])),
          'gto_sharpen': new FormControl(null, Validators.maxLength(20)),
          'gto_refs': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(3)])),
          'gto_frame_rate': new FormControl('29.97', Validators.compose([Validators.required, Validators.maxLength(5)])),
          'gto_static_use': new FormControl('N', Validators.required),
          'gto_static_encode': new FormControl({value: null, disabled: true}, Validators.compose([Validators.required, Validators.maxLength(400)])),
          'gto_drm': new FormControl('N', Validators.required),
          'gto_drm_encode': new FormControl({value: null, disabled: true}, Validators.compose([Validators.required, Validators.maxLength(10)]))
        }),
        svc: this.formBuilder.array([
          this.formBuilder.group({
            'gss_ftp_ip': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(15)])),
            'gss_ftp_port': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(5)])),
            'gss_ftp_id': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(20)])),
            'gss_ftp_pw': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(20)])),
            'gss_ftp_mode': new FormControl('PASV', Validators.compose([Validators.required, Validators.maxLength(50)]))
          })
        ])
      })
    );
  }
  removeTranscodingOption(index) {
    const tcdList = <FormArray>this.serviceform.get('tcd');
    tcdList.removeAt(index);
  }
  /*서비스서버 - 추가, 삭제*/
  addServiceServer(index) {
    (<FormArray>index.get('svc')).push(
      this.formBuilder.group({
        'gss_ftp_ip': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(15)])),
        'gss_ftp_port': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(5)])),
        'gss_ftp_id': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(20)])),
        'gss_ftp_pw': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(20)])),
        'gss_ftp_mode': new FormControl('PASV', Validators.compose([Validators.required, Validators.maxLength(50)]))
      })
    );
  }
  removeServiceServer(tcdIndex, svcIndex) {
    const svcList = <FormArray>this.serviceform.get('tcd').get([tcdIndex]).get('svc');
    svcList.removeAt(svcIndex);
  }

  get thmData() { return <FormArray>this.serviceform.get('thm'); }

  get tcdData() { return <FormArray>this.serviceform.get('tcd'); }

  changeStaticEncodeStatus(item) {
    item.get('opt').get('gto_static_use').value === 'X' ? item.get('opt').get('gto_static_encode').enable() : item.get('opt').get('gto_static_encode').disable();
  }

  changeDrmEncodeStatus(item) {
    item.get('opt').get('gto_drm').value === 'X' ? item.get('opt').get('gto_drm_encode').enable() : item.get('opt').get('gto_drm_encode').disable();
  }

  changePreset() {
    const preset = this.serviceform.get('preset');
    let label_value = '';
    let form_value = true;
    if (preset.get('service_type').value === 'normal') {
      label_value = '';
      form_value = false;
    } else {
      label_value = 'on';
      form_value = true;
    }
    document.getElementById('bookmark_label').setAttribute('class', label_value);
    document.getElementById('loopPortion_label').setAttribute('class', label_value);
    document.getElementById('playbackRate_label').setAttribute('class', label_value);
    document.getElementById('setting_label').setAttribute('class', 'on');
    document.getElementById('nextVideo_label').setAttribute('class', 'on');
    document.getElementById('nextVideo_label').setAttribute('class', 'on');
    document.getElementById('fullscreen_label').setAttribute('class', 'on');
    document.getElementById('cinemaMode_label').setAttribute('class', 'on');
    document.getElementById('quality_label').setAttribute('class', 'on');
    document.getElementById('subtitle_label').setAttribute('class', 'on');
    preset.get('bookmark').setValue(form_value);
    preset.get('loopPortion').setValue(form_value);
    preset.get('playbackRate').setValue(form_value);
    preset.get('setting').setValue(true);
    preset.get('nextVideo').setValue(true);
    preset.get('fullscreen').setValue(true);
    preset.get('cinemaMode').setValue(true);
    preset.get('quality').setValue(true);
    preset.get('subtitle').setValue(true);
  }
}
