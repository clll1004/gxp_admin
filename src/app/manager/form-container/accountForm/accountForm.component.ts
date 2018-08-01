import { Component, OnInit } from '@angular/core';
import { Validators,FormControl,FormGroup,FormBuilder  } from '@angular/forms';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Http } from "@angular/http";
import { AccountFormValidator } from './passwordValidator';
import { UserService } from "../../../services/apis/adm/user/user.service";
import { Sha256 } from "../../../services/library/hash/sha256";

@Component({
  selector: 'accountForm',
  templateUrl: './accountForm.component.html',
  styleUrls: ['../form-container.component.scss'],
  providers: [ UserService, Sha256 ]
})

export class AccountFormComponent implements OnInit {
  params: Params;

  public accountform: FormGroup;
  public submitted: boolean;

  /*for check add page row*/
  public isAddRow: boolean = true;
  public ableID: boolean = false;
  public showIdDupMsg: boolean = false;

  /*for dropdown*/
  public cus_seq_options: any[] = [];
  public grp_seq_options: any[] = [];

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private http: Http,
              private userService: UserService,
              private sha256: Sha256) {

    this.activatedRoute.params.subscribe( (params) => {
      this.params = params;
    });
  }

  ngOnInit() {
    this.accountform = this.formBuilder.group({
      /*CMS 계정*/
      'usr_seq': new FormControl(null),
      'cus_nm_ko': new FormControl(null),
      'usr_cus_seq': new FormControl(null,Validators.required),
      'usr_grp_seq': new FormControl(null,Validators.required),
      'usr_id': new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(50)])),
      'usr_pw': [null, [Validators.required, Validators.maxLength(32)]],
      'usr_pw_cf': [null, [Validators.required, Validators.maxLength(32)]],
      'usr_nm': new FormControl(null, Validators.maxLength(30)),
      'usr_mobile': new FormControl(null, Validators.maxLength(14)),
      'usr_tel': new FormControl(null, Validators.maxLength(14)),
      'usr_use_yn':  new FormControl('Y', Validators.required),
      'usr_remark': new FormControl(null, Validators.maxLength(100))
    }, {
      validator: AccountFormValidator.checkPassword
    });

    this.activatedRoute.url.subscribe((urlItem) => {
      this.isAddRow = urlItem[2].path === 'add';

      if(!this.isAddRow) {
        this.loadAccountList();
        this.accountform.controls['usr_cus_seq'].setValidators([]);
        this.accountform.controls['usr_grp_seq'].setValidators([]);
        this.accountform.controls['usr_id'].setValidators([]);
        this.accountform.controls['usr_pw'].setValidators([]);
        this.accountform.controls['usr_pw_cf'].setValidators([]);
      } else {
        this.loadCustomerGroupList();
      }
    });
  }

  onSubmit(value) {
    const valueObject = {};
    this.submitted = true;

    if(this.isAddRow) {
      Object.entries(value).forEach((item) => {
        if(item[0] !== 'usr_pw_cf' && item[0] !== 'cus_nm_ko' && item[1]) {
          valueObject[item[0]] = item[1];
        }
      });

      valueObject['usr_pw'] = this.sha256.get(valueObject['usr_pw']);

      this.userService.postUser(valueObject)
        .toPromise()
        .then(() => {
          alert('완료되었습니다.');
          location.replace('/manager/account');
        })
        .catch((error) => { console.log(error); });
    } else {
      Object.entries(value).forEach((item) => {
        if(item[0] !== 'cus_nm_ko' && item[1]) {
          valueObject[item[0]] = item[1];
        }
      });
      this.userService.updateData(valueObject)
        .toPromise()
        .then(() => {
          alert('수정 완료되었습니다.');
          window.location.reload();
        })
        .catch((error) => { console.log(error); });
    }
  }

  goBack() {
    this.router.navigate(['/manager', 'account']);
  }

  loadCustomerGroupList() {
    let list;
    this.userService.getLists('http://183.110.11.49/adm/common/list/customer')
      .toPromise()
      .then((params) => {
        list = JSON.parse(params["_body"]);
        list.forEach((customerItem) => {
          customerItem.label = customerItem.cus_nm_ko;
          customerItem.value = customerItem.cus_seq;
          this.cus_seq_options.push(customerItem);
         });
        return list;
      })
      .then((res: any[]) => {
        res.forEach((customerItem) => {
          this.userService.getLists('http://183.110.11.49/adm/common/list/group/' + customerItem.cus_seq)
            .toPromise()
            .then((params) => {
              list = JSON.parse(params["_body"]);
              list.forEach((groupItem) => {
                groupItem.label = groupItem.grp_nm;
                groupItem.value = groupItem.grp_seq;
                this.grp_seq_options.push(groupItem);
              });
            })
            .catch((error) => {
              console.log(error);
            })
        });

      })
      .catch((error) => { console.log(error); });
  }

  confirmID() {
    this.showIdDupMsg = true;
    const inputId:string = this.accountform.value['usr_id'];
    this.http.get('http://183.110.11.49/adm/common/check/userid/'+inputId).subscribe((cont) => {
      this.ableID = cont["_body"] === 'true';
    });
  }

  loadAccountList() {
    this.userService.getLists('http://183.110.11.49/adm/user/' + this.params.index)
      .toPromise()
      .then((data) => {
          const getData:any[] = JSON.parse(data["_body"]);
          this.accountform.get('usr_seq').setValue(getData['usr_seq']);
          this.accountform.get('cus_nm_ko').setValue(getData['cus_nm_ko']);
          this.accountform.get('usr_id').setValue(getData['usr_id']);
          this.accountform.get('usr_nm').setValue(getData['usr_nm']);
          this.accountform.get('usr_mobile').setValue(getData['usr_mobile']);
          this.accountform.get('usr_tel').setValue(getData['usr_tel']);
          this.accountform.get('usr_use_yn').setValue(getData['usr_use_yn']);
          this.accountform.get('usr_remark').setValue(getData['usr_remark']);
       });
  }
}
