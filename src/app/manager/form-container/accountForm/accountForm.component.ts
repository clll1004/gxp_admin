import { Component, OnInit } from '@angular/core';
import { Validators,FormControl,FormGroup,FormBuilder  } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { Http } from "@angular/http";
import { Observable } from "rxjs/internal/Observable";

@Component({
  selector: 'accountForm',
  templateUrl: './accountForm.component.html',
  styleUrls: ['../form-container.component.scss']
})

export class AccountFormComponent implements OnInit {
  accountform: FormGroup;
  submitted: boolean;

  /*for check add page row*/
  isAddRow: boolean = true;
  checkID: boolean = false;

  /*for dropdown*/
  cus_seq_options: any[];
  cus_seq: any[];
  grp_seq_options: any[];
  grp_seq: any[];

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private http: Http) {
    this.cus_seq_options = [
      {label:'선택하세요', value:null},
      {label:'고객1', value:true},
      {label:'고객2', value:false}
    ];
    this.grp_seq_options = [
      {label:'선택하세요', value:null},
      {label:'그룹1', value:true},
      {label:'그룹2', value:false}
    ];
  }

  ngOnInit() {
    this.accountform = this.formBuilder.group({
      /*CMS 계정*/
      'cus_seq': new FormControl('',Validators.required),
      'grp_seq': new FormControl('',Validators.required),
      'usr_id': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(50)])),
      'usr_pw': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(32)])),
      'usr_nm': new FormControl('', Validators.compose([Validators.required, Validators.maxLength(30)])),
      'usr_mobile': new FormControl('', Validators.maxLength(14)),
      'usr_tel': new FormControl('', Validators.maxLength(14)),
      'usr_remark': new FormControl('', Validators.maxLength(100)),
      'user_use':  new FormControl('Y', Validators.required)
    });

    this.activatedRoute.url.subscribe((urlItem) => {
      urlItem[2].path == 'add' ? this.isAddRow = true : this.isAddRow = false;
      if(!this.isAddRow) {
        this.accountform.controls['cus_seq'].setValidators([]);
        this.accountform.controls['grp_seq'].setValidators([]);
        this.accountform.controls['usr_id'].setValidators([]);
      }
    });
  }

  onSubmit(value: string) {
    this.submitted = true;
  }

  get diagnostic() {
    return JSON.stringify(this.accountform.value);
  }

  checkIDs() {
    const inputId:string = this.accountform.value['usr_id'];
    this.getLists('http://183.110.11.49/adm/common/check/userid/'+inputId).subscribe((cont) => {
      console.log(cont._body);
      cont._body === 'true' ? this.checkID = true : this.checkID = false;
    });
  }

  getLists(listUrl): Observable<any> {
    console.log(listUrl);
    return this.http.get(listUrl);
  }
}
