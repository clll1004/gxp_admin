import { Component, Input, OnInit } from '@angular/core';
import { Validators,FormControl,FormGroup,FormBuilder  } from '@angular/forms';
import { Message, SelectItem } from 'primeng/api';

@Component({
  selector: 'form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss']
})
export class FormContainerComponent implements OnInit {
  @Input() params: object;
  @Input() pathName: string = '';

  msgs: Message[] = [];
  customerform: FormGroup;


  submitted: boolean;
  description: string;

  optionName = ['HQ', 'MQ', 'LQ', 'C1', 'C2'];


  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.customerform = this.formBuilder.group({
      /*고객정보*/
      'cus_nm_en': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(30)])),
      'cus_nm_ko': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(30)])),
      'cus_inchg_nm': new FormControl('', Validators.maxLength(20)),
      'cus_inchg_email': new FormControl('', Validators.maxLength(50)),
      'cus_inchg_tel': new FormControl('', Validators.maxLength(14)),

      /*트랜스코딩 정보*/
      'grp_tcd_desc': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(50)])),
      'grp_nm': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(20)])),
      'grp_svc_domain': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(50)])),
      'grp_svc_sub_url': new FormControl('', Validators.maxLength(50)),
      'grp_callback_url': new FormControl('', Validators.maxLength(200)),
      'grp_thm_domain': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(50)])),
      'grp_thm_interval': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(2)])),
      'grp_ftp_ip': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(15)])),
      'grp_ftp_port': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(5)])),
      'grp_ftp_id': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(20)])),
      'grp_ftp_pw': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(20)])),
      'grp_ftp_bak_ip': new FormControl('', Validators.maxLength(15)),


    });
  }

  onSubmit(value: string) {
    this.submitted = true;
    this.msgs = [];
    this.msgs.push({severity:'info', summary:'Success', detail:'Form Submitted'});
  }

  get diagnostic() { return JSON.stringify(this.customerform.value); }




}
