import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Http } from '@angular/http';
import { GroupService } from "../../../services/apis/adm/group/group.service"

@Component({
  selector: 'groupForm',
  templateUrl: './groupForm.component.html',
  styleUrls: ['../form-container.component.scss'],
  providers: [ GroupService ]
})

export class GroupFormComponent implements OnInit {
  params: Params;

  groupform: FormGroup;
  customerList: any[]= [ ];
  customerName: string;
  submitted: boolean;

  /*for check addpagebb row*/
  isAddRow: boolean = true;
  ableGroupName: boolean = false;
  showGroupDupMsg: boolean = false;

  /*for dropdown*/
  server_mode_options = [
    {label:'선택하세요', value:null},
    {label:'PASV', value: 'PASV'},
    {label:'ACTV', value: 'ACTV'}
  ];
  grp_stream_svr_type_options = [
    {label:'선택하세요', value:null},
    {label:'gxp', value: 'gxp'},
    {label:'WOWZA', value: 'WOWZA'},
    {label:'etc', value: 'etc'}
  ];
  gto_bitrate_mode_options =[
    {label:'선택하세요', value:null},
    {label:'CBR', value: 'CBR'},
    {label:'VBR', value: 'VBR'}
  ];
  gto_frame_rate_options =[
    {label:'선택하세요', value:null},
    {label:'copy', value: 'copy'},
    {label:'29.97', value: '29.97'},
    {label:'27.97', value: '27.97'},
    {label:'25.97', value: '25.97'},
    {label:'23.97', value: '23.97'}
  ];

  cus_seq_options: any[]= [ ];

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private http: Http,
              private groupService: GroupService) {
    this.activatedRoute.params.subscribe( (params) => {
      this.params = params;
    });
  }

  ngOnInit() {
    this.activatedRoute.url.subscribe((urlItem) => {
      this.isAddRow = urlItem[2].path === 'add';

      this.load();
    });

    this.groupform = this.formBuilder.group({
      grp: this.formBuilder.group({
        /*트랜스코딩 정보*/
        'grp_seq': new FormControl(null),
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
            'gto_sharpen': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(20)])),
            'gto_refs': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(3)])),
            'gto_frame_rate': new FormControl('29.97', Validators.compose([Validators.required, Validators.maxLength(5)])),
            'gto_static_use': new FormControl('N', Validators.required),
            'gto_static_encode': new FormControl('N', Validators.compose([Validators.required, Validators.maxLength(400)])),
            'gto_drm': new FormControl('N', Validators.compose([Validators.required, Validators.maxLength(10)]))
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
  }

  onSubmit(formObject: any) {
    const valueObject = {};
    this.submitted = true;

    if(this.isAddRow) {
      this.groupService.postData(formObject);
    } else {
      Object.entries(formObject).forEach((item) => {
        if(item[1]) {
          valueObject[item[0]] = item[1];
        }
      });
      delete valueObject['grp'].grp_cus_seq;
      this.groupService.updateData(valueObject);
    }
  }

  goBack() {
    this.router.navigate(['/manager', 'group']);
  }

  load() {
    if(this.isAddRow) {
      this.loadCustomerList();
    } else {
      this.loadGroupList();
    }
  }
  loadCustomerList() {
    let list;
    this.groupService.getLists('http://183.110.11.49/adm/customer/list?page=1&row=10000').subscribe((params)=>{
      list = JSON.parse(params._body).list;
      list.forEach((item) => {
        item.label = item.cus_nm_en;
        item.value = item.cus_seq;
        this.cus_seq_options.push(item);
      });
    });
  }
  loadGroupList() {
    this.http.get('http://183.110.11.49/adm/group/' + this.params.index).subscribe((data) => {
      const getData = JSON.parse((<any>data)._body);

      /*load groupform grp*/
      this.customerName = getData.grp['cus_nm_ko'];
      this.groupform.get('grp').get('grp_nm').setValue(getData.grp['grp_nm']);
      this.groupform.get('grp').get('grp_seq').setValue(getData.grp['grp_seq']);
      this.groupform.get('grp').get('grp_tcd_desc').setValue(getData.grp['grp_tcd_desc']);
      this.groupform.get('grp').get('grp_basic_yn').setValue(getData.grp['grp_basic_yn']);
      this.groupform.get('grp').get('grp_use_yn').setValue(getData.grp['grp_use_yn']);
      this.groupform.get('grp').get('grp_svc_domain').setValue(getData.grp['grp_svc_domain']);
      this.groupform.get('grp').get('grp_svc_sub_url').setValue(getData.grp['grp_svc_sub_url']);
      this.groupform.get('grp').get('grp_callback_url').setValue(getData.grp['grp_callback_url']);
      this.groupform.get('grp').get('grp_smil_use_yn').setValue(getData.grp['grp_smil_use_yn']);
      this.groupform.get('grp').get('grp_autoresol_use_yn').setValue(getData.grp['grp_autoresol_use_yn']);
      this.groupform.get('grp').get('grp_file_suffix_use').setValue(getData.grp['grp_file_suffix_use']);
      this.groupform.get('grp').get('grp_thm_make_yn').setValue(getData.grp['grp_thm_make_yn']);
      this.groupform.get('grp').get('grp_thm_domain').setValue(getData.grp['grp_thm_domain']);
      this.groupform.get('grp').get('grp_thm_interval').setValue(getData.grp['grp_thm_interval']);
      this.groupform.get('grp').get('grp_security_type').setValue(getData.grp['grp_security_type']);
      this.groupform.get('grp').get('grp_ftp_ip').setValue(getData.grp['grp_ftp_ip']);
      this.groupform.get('grp').get('grp_ftp_port').setValue(getData.grp['grp_ftp_port']);
      this.groupform.get('grp').get('grp_ftp_id').setValue(getData.grp['grp_ftp_id']);
      this.groupform.get('grp').get('grp_ftp_pw').setValue(getData.grp['grp_ftp_pw']);
      this.groupform.get('grp').get('grp_ftp_mode').setValue(getData.grp['grp_ftp_mode']);
      this.groupform.get('grp').get('grp_ftp_bak_ip').setValue(getData.grp['grp_ftp_bak_ip']);
      this.groupform.get('grp').get('grp_stream_svr_type').setValue(getData.grp['grp_stream_svr_type']);
      /*load groupform thm*/
      getData.thm.forEach((item) => {
        (<FormArray>this.groupform.get('thm')).push(
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
      (<FormArray>this.groupform.get('thm')).removeAt(0);
      /*load groupform tcd*/
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
          'gto_sharpen': new FormControl(tcdItem.opt.gto_sharpen, Validators.compose([Validators.required, Validators.maxLength(20)])),
          'gto_refs': new FormControl(tcdItem.opt.gto_refs, Validators.compose([Validators.required, Validators.maxLength(3)])),
          'gto_frame_rate': new FormControl(tcdItem.opt.gto_frame_rate, Validators.compose([Validators.required, Validators.maxLength(5)])),
          'gto_static_use': new FormControl(tcdItem.opt.gto_static_use, Validators.required),
          'gto_static_encode': new FormControl(tcdItem.opt.gto_static_encode, Validators.compose([Validators.required, Validators.maxLength(400)])),
          'gto_drm': new FormControl(tcdItem.opt.gto_drm, Validators.compose([Validators.required, Validators.maxLength(10)]))
        });
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

        (<FormArray>this.groupform.get('tcd')).push(item);
      });
      (<FormArray>this.groupform.get('tcd')).removeAt(0);
    });
  }

  /*중복확인 - 그룹명*/
  confirmGroupName() {
    this.showGroupDupMsg = true;
    const inputname:string = this.groupform.get('grp').value['grp_nm'];
    this.groupService.getLists('http://183.110.11.49/adm/common/check/groupnm/'+inputname).subscribe((cont) => {
      this.ableGroupName = cont._body === 'true';
    });
  }
  /*썸네일서버 - 추가, 삭제*/
  addThumbnailServer() {
    (<FormArray>this.groupform.get('thm')).push(
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
    const thmList = <FormArray>this.groupform.get('thm');
    thmList.removeAt(index);
  }
  /*트랜스코딩 변환옵션 - 추가, 삭제*/
  addTranscodingOption() {
    (<FormArray>this.groupform.get('tcd')).push(
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
          'gto_sharpen': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(20)])),
          'gto_refs': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(3)])),
          'gto_frame_rate': new FormControl('29.97', Validators.compose([Validators.required, Validators.maxLength(5)])),
          'gto_static_use': new FormControl('N', Validators.required),
          'gto_static_encode': new FormControl('N', Validators.compose([Validators.required, Validators.maxLength(400)])),
          'gto_drm': new FormControl('N', Validators.compose([Validators.required, Validators.maxLength(10)]))
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
    const tcdList = <FormArray>this.groupform.get('tcd');
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
    const svcList = <FormArray>this.groupform.get('tcd').get([tcdIndex]).get('svc');
    svcList.removeAt(svcIndex);
  }

  get thmData() { return <FormArray>this.groupform.get('thm'); }
  get tcdData() { return <FormArray>this.groupform.get('tcd'); }
}
