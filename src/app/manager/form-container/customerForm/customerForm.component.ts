import { Component, OnInit } from '@angular/core';
import { Validators,FormControl,FormGroup,FormBuilder  } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'customerForm',
  templateUrl: './customerForm.component.html',
  styleUrls: ['../form-container.component.scss']
})

export class CustomerFormComponent implements OnInit {
  customerform: FormGroup;
  submitted: boolean;

  /*for check addpage row*/
  isAddRow: boolean = true;

  isThmRow: boolean = true;

  /*for dropdown*/
  server_mode_options: any[];
  grp_thm_mode: any[];
  grp_ftp_mode: any[];
  grp_stream_svr_type_options: any[];
  grp_stream_svr_type: any[];
  gto_bitrate_mode_options: any[];
  gto_bitrate_mode: any[];
  gto_frame_rate_options: any[];
  gto_frame_rate: any[];

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute) {
    this.server_mode_options = [
      {label:'선택하세요', value:null},
      {label:'PASV', value: 'PASV'},
      {label:'ACTV', value: 'ACTV'}
    ];
    this.grp_stream_svr_type_options = [
      {label:'선택하세요', value:null},
      {label:'WOWZA', value: 'WOWZA'},
      {label:'etc', value: 'etc'}
    ];
    this.gto_bitrate_mode_options =[
      {label:'선택하세요', value:null},
      {label:'CBR', value: 'CBR'},
      {label:'VBR', value: 'VBR'}
    ];
    this.gto_frame_rate_options =[
      {label:'선택하세요', value:null},
      {label:'copy', value: 'copy'},
      {label:'29.97', value: '29.97'},
      {label:'27.97', value: '27.97'},
      {label:'25.97', value: '25.97'},
      {label:'23.97', value: '23.97'}
    ];
  }

  ngOnInit() {
    this.activatedRoute.url.subscribe((urlItem) => {
      urlItem[2].path == 'add' ? this.isAddRow =true : this.isAddRow = false;
    });

    this.customerform = this.formBuilder.group({
      /*고객 기본 정보*/
      'cus_nm_en': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(30)])),
      'cus_nm_ko': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(30)])),
      'cus_inchg_nm': new FormControl('', Validators.maxLength(20)),
      'cus_inchg_email': new FormControl('', Validators.maxLength(50)),
      'cus_inchg_tel': new FormControl('', Validators.maxLength(14)),
      'cus_sngl_cvt_yn':  new FormControl(''),
      'cus_use_yn':  new FormControl('y'),
      'cus_test_yn':  new FormControl('n'),

      /*트랜스코딩 정보*/
      'grp_tcd_desc': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(50)])),
      'grp_nm': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(20)])),
      'grp_svc_domain': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(50)])),
      'grp_svc_sub_url': new FormControl('', Validators.maxLength(50)),
      'grp_callback_url': new FormControl('', Validators.maxLength(200)),
      'grp_smil_use_yn': new FormControl('n', Validators.required),
      'grp_autoresol_use_yn': new FormControl('n', Validators.required),
      'grp_file_suffix_use': new FormControl('y', Validators.required),
      'grp_thm_make_yn': new FormControl('n', Validators.required),
      'grp_thm_domain': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(50)])),
      'gts_ftp_ip': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(15)])),
      'gts_ftp_port': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(5)])),
      'gts_ftp_id': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(20)])),
      'gts_ftp_pw': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(20)])),
      'gts_ftp_mode': new FormControl('PASV', Validators.compose([Validators.required, Validators.maxLength(50)])),
      'grp_thm_interval': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(2)])),
      'grp_security_type': new FormControl('n', Validators.required),
      'grp_ftp_ip': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(15)])),
      'grp_ftp_port': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(5)])),
      'grp_ftp_id': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(20)])),
      'grp_ftp_pw': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(20)])),
      'grp_ftp_mode': new FormControl('PASV', Validators.compose([Validators.required, Validators.maxLength(50)])),
      'grp_ftp_bak_ip': new FormControl('', Validators.maxLength(15)),
      'grp_stream_svr_type': new FormControl('gxp', Validators.compose([Validators.required, Validators.maxLength(5)])),

      /*트랜스코딩 변환옵션*/
      'gto_use_yn': new FormControl('y', Validators.required),
      'gto_nm': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(10)])),
      'gto_desc': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(4)])),
      'gto_file_suffix': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(10)])),
      'gto_file_container': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(5)])),
      'gto_video_bitrate': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(5)])),
      'gto_audio_bitrate': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(5)])),
      'gto_max_bitrate': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(6)])),
      'gto_video_rsvopt': new FormControl('', Validators.maxLength(100)),
      'gto_audio_rsvopt': new FormControl('', Validators.maxLength(100)),
      'gto_dst_width': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(5)])),
      'gto_dst_height': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(5)])),
      'gto_video_aspect': new FormControl('AUTO', Validators.compose([Validators.required, Validators.maxLength(8)])),
      'gto_main': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(5)])),
      'gto_baseline': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(3)])),
      'gto_high': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(3)])),
      'gto_bitrate_mode': new FormControl('CBR', Validators.compose([Validators.required, Validators.maxLength(3)])),
      'gto_sharpen': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(20)])),
      'gto_refs': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(3)])),
      'gto_frame_rate': new FormControl('29.97', Validators.compose([Validators.required, Validators.maxLength(5)])),
      'gto_static_use': new FormControl('n', Validators.required),
      'gto_static_encode': new FormControl('n', Validators.compose([Validators.required, Validators.maxLength(400)])),
      'gto_drm': new FormControl('n', Validators.compose([Validators.required, Validators.maxLength(10)])),
      'gss_ftp_ip': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(15)])),
      'gss_ftp_port': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(5)])),
      'gss_ftp_id': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(20)])),
      'gss_ftp_pw': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(20)])),
      'gss_ftp_mode': new FormControl('PASV', Validators.compose([Validators.required, Validators.maxLength(50)])),
    });
  }

  onSubmit(value: string) {
    this.submitted = true;
  }

  get diagnostic() { return JSON.stringify(this.customerform.value); }
}
