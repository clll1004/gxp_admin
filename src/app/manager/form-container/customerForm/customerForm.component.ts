import { Component, OnInit } from '@angular/core';
import { Validators,FormControl,FormGroup,FormBuilder,FormArray } from '@angular/forms';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Http } from '@angular/http';
import { CustomerService } from '../../../services/apis/adm/customer/customer.service';
import { AdminApis } from '../../../services/apis/apis';

@Component({
  selector: 'customerForm',
  templateUrl: './customerForm.component.html',
  styleUrls: ['../form-container.component.scss'],
  providers: [ CustomerService, AdminApis ]
})

export class CustomerFormComponent implements OnInit {
  params: Params;

  public customerform: FormGroup;
  public submitted: boolean;

  /*for check addpagebb row*/
  public isAddRow: boolean = true;
  public ableCustomerName: boolean = false;
  public showNameDupMsg: boolean = false;
  public ableGroupName: boolean = false;
  public showGroupDupMsg: boolean = false;

  /*for dropdown*/
  public server_mode_options: any[] = [
    {label:'선택하세요', value:null},
    {label:'PASV', value: 'PASV'},
    {label:'ACTV', value: 'ACTV'}
  ];
  public grp_stream_svr_type_options: any[] = [
    {label:'선택하세요', value:null},
    {label:'gxp', value: 'gxp'},
    {label:'WOWZA', value: 'WOWZA'},
    {label:'etc', value: 'etc'}
  ];
  public gto_bitrate_mode_options: any[] = [
    {label:'선택하세요', value:null},
    {label:'CBR', value: 'CBR'},
    {label:'VBR', value: 'VBR'}
  ];
  public gto_frame_rate_options: any[] = [
    {label:'선택하세요', value:null},
    {label:'copy', value: 'copy'},
    {label:'29.97', value: '29.97'},
    {label:'27.97', value: '27.97'},
    {label:'25.97', value: '25.97'},
    {label:'23.97', value: '23.97'}
  ];

  constructor(private formBuilder: FormBuilder,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private http: Http,
                private customerService: CustomerService,
                private adminApis: AdminApis) {
    this.activatedRoute.params.subscribe( (params) => {
      this.params = params;
    });
  }

  ngOnInit() {
    this.activatedRoute.url.subscribe((urlItem) => {
      this.isAddRow = urlItem[2].path === 'add';

      if(!this.isAddRow) {
        this.loadCustomerList();
      }
    });

    if(this.isAddRow) {
      this.customerform = this.formBuilder.group({
        cus: this.formBuilder.group({
          /*고객 기본 정보*/
          'cus_nm_en': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(30)])),
          'cus_nm_ko': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(30)])),
          'cus_inchg_nm': new FormControl(null, Validators.maxLength(20)),
          'cus_inchg_email': new FormControl(null, Validators.maxLength(50)),
          'cus_inchg_tel': new FormControl(null, Validators.maxLength(14)),
          'cus_sngl_cvt_yn':  new FormControl('N'),
          'cus_use_yn':  new FormControl('Y'),
          'cus_test_yn':  new FormControl('N')
        }),
        grp: this.formBuilder.group({
          /*트랜스코딩 정보*/
          'grp_tcd_desc': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(50)])),
          'grp_nm': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(20)])),
          'grp_use_yn': new FormControl('Y', Validators.required),
          'grp_basic_yn': new FormControl('Y', Validators.required),
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
                'gss_ftp_pw': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(20)])),
                'gss_ftp_mode': new FormControl('PASV', Validators.compose([Validators.required, Validators.maxLength(50)]))
              })
            ])
          })
        ])
       });
    } else {
      this.customerform = this.formBuilder.group({
        cus: this.formBuilder.group({
          /*고객 기본 정보*/
          'cus_seq': new FormControl(null),
          'cus_nm_en': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(30)])),
          'cus_nm_ko': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(30)])),
          'cus_inchg_nm': new FormControl(null, Validators.maxLength(20)),
          'cus_inchg_email': new FormControl(null, Validators.maxLength(50)),
          'cus_inchg_tel': new FormControl(null, Validators.maxLength(14)),
          'cus_sngl_cvt_yn':  new FormControl('N'),
          'cus_use_yn':  new FormControl('Y'),
          'cus_test_yn':  new FormControl('N')
        })
      });
    }
  }

  onSubmit(formObject: any) {
    const valueObject = {};
    this.submitted = true;

    if(this.isAddRow) {
      Object.entries(formObject).forEach((item) => {
        if(item[0] === 'tcd') {
          item[1].forEach((optItem) => {
            if(optItem.opt.gto_drm_encode) {
              optItem.opt.gto_drm = optItem.opt.gto_drm_encode;
            }
          });
        }
      });
      valueObject = formObject;
      Object.entries(valueObject).forEach((item) => {
        if(item[0] === 'tcd') {
          item[1].forEach((optItem) => {
            if(optItem.opt.gto_drm_encode) {
              delete optItem.opt.gto_drm_encode;
            }
          })
        }
      });
      this.customerService.postCustomer(valueObject);
    } else {
      this.customerService.updateCustomer(formObject.cus);
    }
  }

  goBack() {
    this.router.navigate(['/manager', 'customer']);
  }

  /*중복확인 - 고객명(영문), 그룹명*/
  confirmCustomerName() {
    this.showNameDupMsg = true;
    const inputName:string = this.customerform.get('cus').value['cus_nm_en'];
    this.customerService.getLists(this.adminApis.checkDupCustomerName + inputName)
      .toPromise()
      .then((cont) => {
        this.ableCustomerName = cont._body === 'true';
      });
  }
  confirmGroupName() {
    this.showGroupDupMsg = true;
    const inputName:string = this.customerform.get('grp').value['grp_nm'];
    this.customerService.getLists(this.adminApis.checkDupGroupName + inputName)
      .toPromise()
      .then((cont) => {
        this.ableGroupName = cont._body === 'true';
      });
  }
  /*썸네일서버 - 추가, 삭제*/
  addThumbnailServer() {
    (<FormArray>this.customerform.get('thm')).push(
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
    const thmList = <FormArray>this.customerform.get('thm');
    thmList.removeAt(index);
  }
  /*트랜스코딩 변환옵션 - 추가, 삭제*/
  addTranscodingOption() {
    (<FormArray>this.customerform.get('tcd')).push(
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
    const tcdList = <FormArray>this.customerform.get('tcd');
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
    const svcList = <FormArray>this.customerform.get('tcd').get([tcdIndex]).get('svc');
    svcList.removeAt(svcIndex);
  }

  loadCustomerList() {
    this.customerService.getLists('http://183.110.11.49/adm/customer/' + this.params.index).subscribe((data) => {
      const getData:any[] = JSON.parse((<any>data)._body);
      this.customerform.controls.cus.get('cus_seq').setValue(getData['cus_seq']);
      this.customerform.controls.cus.get('cus_nm_en').setValue(getData['cus_nm_en']);
      this.customerform.controls.cus.get('cus_nm_ko').setValue(getData['cus_nm_ko']);
      this.customerform.controls.cus.get('cus_inchg_nm').setValue(getData['cus_inchg_nm']);
      this.customerform.controls.cus.get('cus_inchg_email').setValue(getData['cus_inchg_email']);
      this.customerform.controls.cus.get('cus_inchg_tel').setValue(getData['cus_inchg_tel']);
      this.customerform.controls.cus.get('cus_sngl_cvt_yn').setValue(getData['cus_sngl_cvt_yn']);
      this.customerform.controls.cus.get('cus_use_yn').setValue(getData['cus_use_yn']);
      this.customerform.controls.cus.get('cus_test_yn').setValue(getData['cus_test_yn']);
    });
  }

  changeStaticEncodeStatus(item) {
    item.get('opt').get('gto_static_use').value === 'X' ? item.get('opt').get('gto_static_encode').enable() : item.get('opt').get('gto_static_encode').disable();
  }
  changeDrmEncodeStatus(item) {
    item.get('opt').get('gto_drm').value === 'X' ? item.get('opt').get('gto_drm_encode').enable() : item.get('opt').get('gto_drm_encode').disable();
  }
}
