import { Component, OnInit } from '@angular/core';
import { Validators,FormControl,FormGroup,FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from '@angular/common';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'customerForm',
  templateUrl: './customerForm.component.html',
  styleUrls: ['../form-container.component.scss']
})

export class CustomerFormComponent implements OnInit {
  params: Params;

  customerform: FormGroup;
  submitted: boolean;

  /*for check addpage row*/
  isAddRow: boolean = true;

  /*for dropdown*/
  server_mode_options: any[];
  grp_stream_svr_type_options: any[];
  gto_bitrate_mode_options: any[];
  gto_frame_rate_options: any[];

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private location: Location, private http: Http) {
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

    this.activatedRoute.params.subscribe( (params) => {
      this.params = params;
    });
  }

  ngOnInit() {
    this.customerform = this.formBuilder.group({
      /*고객 기본 정보*/
      'cus_seq': new FormControl('', Validators.required),
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

    this.activatedRoute.url.subscribe((urlItem) => {
      urlItem[2].path == 'add' ? this.isAddRow =true : this.isAddRow = false;

      if(!this.isAddRow) {
        this.loadData();
      }
      if(!this.isAddRow) {
        this.customerform.controls['grp_tcd_desc'].setValidators([]);
        this.customerform.controls['grp_nm'].setValidators([]);
        this.customerform.controls['grp_svc_domain'].setValidators([]);
        this.customerform.controls['grp_svc_sub_url'].setValidators([]);
        this.customerform.controls['grp_callback_url'].setValidators([]);
        this.customerform.controls['grp_smil_use_yn'].setValidators([]);
        this.customerform.controls['grp_autoresol_use_yn'].setValidators([]);
        this.customerform.controls['grp_file_suffix_use'].setValidators([]);
        this.customerform.controls['grp_thm_make_yn'].setValidators([]);
        this.customerform.controls['grp_thm_domain'].setValidators([]);
        this.customerform.controls['gts_ftp_ip'].setValidators([]);
        this.customerform.controls['gts_ftp_port'].setValidators([]);
        this.customerform.controls['gts_ftp_id'].setValidators([]);
        this.customerform.controls['gts_ftp_pw'].setValidators([]);
        this.customerform.controls['gts_ftp_mode'].setValidators([]);
        this.customerform.controls['grp_thm_interval'].setValidators([]);
        this.customerform.controls['grp_security_type'].setValidators([]);
        this.customerform.controls['grp_ftp_ip'].setValidators([]);
        this.customerform.controls['grp_ftp_port'].setValidators([]);
        this.customerform.controls['grp_ftp_id'].setValidators([]);
        this.customerform.controls['grp_ftp_pw'].setValidators([]);
        this.customerform.controls['grp_ftp_mode'].setValidators([]);
        this.customerform.controls['grp_ftp_bak_ip'].setValidators([]);
        this.customerform.controls['grp_stream_svr_type'].setValidators([]);

        this.customerform.controls['gto_use_yn'].setValidators([]);
        this.customerform.controls['gto_nm'].setValidators([]);
        this.customerform.controls['gto_desc'].setValidators([]);
        this.customerform.controls['gto_file_suffix'].setValidators([]);
        this.customerform.controls['gto_file_container'].setValidators([]);
        this.customerform.controls['gto_video_bitrate'].setValidators([]);
        this.customerform.controls['gto_audio_bitrate'].setValidators([]);
        this.customerform.controls['gto_max_bitrate'].setValidators([]);
        this.customerform.controls['gto_video_rsvopt'].setValidators([]);
        this.customerform.controls['gto_audio_rsvopt'].setValidators([]);
        this.customerform.controls['gto_dst_width'].setValidators([]);
        this.customerform.controls['gto_dst_height'].setValidators([]);
        this.customerform.controls['gto_video_aspect'].setValidators([]);
        this.customerform.controls['gto_main'].setValidators([]);
        this.customerform.controls['gto_baseline'].setValidators([]);
        this.customerform.controls['gto_high'].setValidators([]);
        this.customerform.controls['gto_bitrate_mode'].setValidators([]);
        this.customerform.controls['gto_sharpen'].setValidators([]);
        this.customerform.controls['gto_refs'].setValidators([]);
        this.customerform.controls['gto_frame_rate'].setValidators([]);
        this.customerform.controls['gto_static_use'].setValidators([]);
        this.customerform.controls['gto_static_encode'].setValidators([]);
        this.customerform.controls['gto_drm'].setValidators([]);
        this.customerform.controls['gss_ftp_ip'].setValidators([]);
        this.customerform.controls['gss_ftp_port'].setValidators([]);
        this.customerform.controls['gss_ftp_id'].setValidators([]);
        this.customerform.controls['gss_ftp_pw'].setValidators([]);
        this.customerform.controls['gss_ftp_mode'].setValidators([]);
      }
    });
  }

  onSubmit(value: string) {
    this.submitted = true;

    this.updateData(value);
  }

  goBack() {
    this.location.back();
  }

  loadData() {
    this.http.get('http://183.110.11.49/adm/customer/' + this.params.index).subscribe((data) => {
      const getData:any[] = JSON.parse((<any>data)._body);
      this.customerform.get('cus_seq').setValue(getData['cus_seq']);
      this.customerform.get('cus_nm_en').setValue(getData['cus_nm_en']);
      this.customerform.get('cus_nm_ko').setValue(getData['cus_nm_ko']);
      this.customerform.get('cus_inchg_nm').setValue(getData['cus_inchg_nm']);
      this.customerform.get('cus_inchg_email').setValue(getData['cus_inchg_email']);
      this.customerform.get('cus_inchg_tel').setValue(getData['cus_inchg_tel']);
      this.customerform.get('cus_sngl_cvt_yn').setValue(getData['cus_sngl_cvt_yn']);
      this.customerform.get('cus_use_yn').setValue(getData['cus_use_yn']);
      this.customerform.get('cus_test_yn').setValue(getData['cus_test_yn']);

      this.customerform.get('grp_tcd_desc').setValue(getData['grp_tcd_desc']);
      this.customerform.get('grp_nm').setValue(getData['grp_nm']);
      this.customerform.get('grp_svc_domain').setValue(getData['grp_svc_domain']);
      this.customerform.get('grp_svc_sub_url').setValue(getData['grp_svc_sub_url']);
      this.customerform.get('grp_callback_url').setValue(getData['grp_callback_url']);
      this.customerform.get('grp_smil_use_yn').setValue(getData['grp_smil_use_yn']);
      this.customerform.get('grp_autoresol_use_yn').setValue(getData['grp_autoresol_use_yn']);
      this.customerform.get('grp_file_suffix_use').setValue(getData['grp_file_suffix_use']);
      this.customerform.get('grp_thm_make_yn').setValue(getData['grp_thm_make_yn']);
      this.customerform.get('grp_thm_domain').setValue(getData['grp_thm_domain']);
      this.customerform.get('gts_ftp_ip').setValue(getData['gts_ftp_ip']);
      this.customerform.get('gts_ftp_port').setValue(getData['gts_ftp_port']);
      this.customerform.get('gts_ftp_id').setValue(getData['gts_ftp_id']);
      this.customerform.get('gts_ftp_pw').setValue(getData['gts_ftp_pw']);
      this.customerform.get('gts_ftp_mode').setValue(getData['gts_ftp_mode']);
      this.customerform.get('grp_thm_interval').setValue(getData['grp_thm_interval']);
      this.customerform.get('grp_security_type').setValue(getData['grp_security_type']);
      this.customerform.get('grp_ftp_ip').setValue(getData['grp_ftp_ip']);
      this.customerform.get('grp_ftp_port').setValue(getData['grp_ftp_port']);
      this.customerform.get('grp_ftp_id').setValue(getData['grp_ftp_id']);
      this.customerform.get('grp_ftp_pw').setValue(getData['grp_ftp_pw']);
      this.customerform.get('grp_ftp_mode').setValue(getData['grp_ftp_mode']);
      this.customerform.get('grp_ftp_bak_ip').setValue(getData['grp_ftp_bak_ip']);
      this.customerform.get('grp_stream_svr_type').setValue(getData['grp_stream_svr_type']);

      this.customerform.get('gto_use_yn').setValue(getData['gto_use_yn']);
      this.customerform.get('gto_nm').setValue(getData['gto_nm']);
      this.customerform.get('gto_desc').setValue(getData['gto_desc']);
      this.customerform.get('gto_file_suffix').setValue(getData['gto_file_suffix']);
      this.customerform.get('gto_file_container').setValue(getData['gto_file_container']);
      this.customerform.get('gto_video_bitrate').setValue(getData['gto_video_bitrate']);
      this.customerform.get('gto_audio_bitrate').setValue(getData['gto_audio_bitrate']);
      this.customerform.get('gto_max_bitrate').setValue(getData['gto_max_bitrate']);
      this.customerform.get('gto_video_rsvopt').setValue(getData['gto_video_rsvopt']);
      this.customerform.get('gto_audio_rsvopt').setValue(getData['gto_audio_rsvopt']);
      this.customerform.get('gto_dst_width').setValue(getData['gto_dst_width']);
      this.customerform.get('gto_dst_height').setValue(getData['gto_dst_height']);
      this.customerform.get('gto_video_aspect').setValue(getData['gto_video_aspect']);
      this.customerform.get('gto_main').setValue(getData['gto_main']);
      this.customerform.get('gto_baseline').setValue(getData['gto_baseline']);
      this.customerform.get('gto_high').setValue(getData['gto_high']);
      this.customerform.get('gto_bitrate_mode').setValue(getData['gto_bitrate_mode']);
      this.customerform.get('gto_sharpen').setValue(getData['gto_sharpen']);
      this.customerform.get('gto_refs').setValue(getData['gto_refs']);
      this.customerform.get('gto_frame_rate').setValue(getData['gto_frame_rate']);
      this.customerform.get('gto_static_use').setValue(getData['gto_static_use']);
      this.customerform.get('gto_static_encode').setValue(getData['gto_static_encode']);
      this.customerform.get('gto_drm').setValue(getData['gto_drm']);
      this.customerform.get('gss_ftp_ip').setValue(getData['gss_ftp_ip']);
      this.customerform.get('gss_ftp_port').setValue(getData['gss_ftp_port']);
      this.customerform.get('gss_ftp_id').setValue(getData['gss_ftp_id']);
      this.customerform.get('gss_ftp_pw').setValue(getData['gss_ftp_pw']);
      this.customerform.get('gss_ftp_mode').setValue(getData['gss_ftp_mode']);

    });
  }

  updateData(newData): Observable<any> {
    const body = newData;

    return this.http.put('http://183.110.11.49/adm/customer', body, {
        headers : {
          'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }).subscribe( () => {});
  }
}
