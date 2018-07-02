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
  grp_thm_mode_options: any[];
  grp_thm_mode: any[];
  grp_ftp_mode_options: any[];
  grp_ftp_mode: any[];
  grp_stream_svr_type_options: any[];
  grp_stream_svr_type: any[];

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute) {
    this.grp_thm_mode_options = [
      {label:'선택하세요', value:null},
      {label:'PASV', value: 'PASV'},
      {label:'ACTV', value: 'ACTV'}
    ];
    this.grp_ftp_mode_options = [
      {label:'선택하세요', value:null},
      {label:'PASV', value: 'PASV'},
      {label:'ACTV', value: 'ACTV'}
    ];
    this.grp_stream_svr_type_options = [
      {label:'선택하세요', value:null},
      {label:'WOWZA', value: 'WOWZA'},
      {label:'etc', value: 'etc'}
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
      'grp_thm_mode': new FormControl('PASV'),

      'grp_thm_interval': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(2)])),
      'grp_security_type': new FormControl('n', Validators.required),
      'grp_ftp_ip': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(15)])),
      'grp_ftp_port': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(5)])),
      'grp_ftp_id': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(20)])),
      'grp_ftp_pw': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(20)])),
      'grp_ftp_mode': new FormControl('PASV', Validators.compose([Validators.required, Validators.maxLength(50)])),
      'grp_ftp_bak_ip': new FormControl('', Validators.maxLength(15)),
      'grp_stream_svr_type': new FormControl('gxp', Validators.compose([Validators.required, Validators.maxLength(5)])),

      
    });
  }

  onSubmit(value: string) {
    this.submitted = true;
  }

  get diagnostic() { return JSON.stringify(this.customerform.value); }
}
