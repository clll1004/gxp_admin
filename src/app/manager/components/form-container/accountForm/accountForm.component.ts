import { Component, OnInit } from '@angular/core';
import { Validators,FormControl,FormGroup,FormBuilder  } from '@angular/forms';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { AccountFormValidator } from './passwordValidator';
import { UserService } from '../../../../services/apis/adm/user/user.service';
import { Sha256 } from '../../../../services/library/hash/sha256';
import { AdminApis } from '../../../../services/apis/apis';
import { ConfirmationService } from 'primeng/components/common/api';

@Component({
  selector: 'accountForm',
  templateUrl: './accountForm.component.html',
  styleUrls: ['../form-container.component.scss'],
  providers: [Sha256, ConfirmationService]})

export class AccountFormComponent implements OnInit {
  params: Params;

  public accountform: FormGroup;
  public submitted: boolean;
  public isShowMessage: boolean = false;

  /*for check add page row*/
  public isAddRow: boolean = true;
  public ableID: boolean = false;
  public showIdDupMsg: boolean = false;
  public checkInput:boolean = false;
  public checkPatternEn:boolean = false;
  public passDup:boolean = false;

  /*for dropdown*/
  public cus_seq_options: any[] = [];
  public grp_seq_options: any[] = [];

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private sha256: Sha256,
              private adminApis: AdminApis,
              private confirmationService: ConfirmationService) {

    this.activatedRoute.params.subscribe( (params) => {
      this.params = params;
    });
  }

  ngOnInit() {
    this.accountform = this.formBuilder.group({
      /*CMS 계정*/
      'usr_seq': new FormControl(null),
      'cus_nm_ko': new FormControl(null),
      'grp_nm': new FormControl(null),
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
        this.loadCustomerList();
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

      this.userService.postUser(this.adminApis.postUser, valueObject)
        .toPromise()
        .then(() => {
          this.confirmationService.confirm({
            message: '등록 완료되었습니다.',
            accept: () => {
              this.router.navigate(['/manager', 'account']);
            }
          });
        })
        .catch((error) => { console.log(error); });
    } else {
      Object.entries(value).forEach((item) => {
        if(item[0] !== 'cus_nm_ko' && item[0] !== 'grp_nm' && item[1]) {
          valueObject[item[0]] = item[1];
        }
      });
      this.userService.updateUser(this.adminApis.updateUser, valueObject)
        .toPromise()
        .then(() => {
          this.isShowMessage = true;
        })
        .catch((error) => { console.log(error); });
    }
  }

  goList() {
    this.router.navigate(['/manager', 'account']);
  }

  loadCustomerList() {
    let list;
    this.userService.getLists(this.adminApis.loadCustomerNames)
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
      .catch((error) => { console.log(error); });
  }

  loadGroupList() {
    this.grp_seq_options = [];
    this.userService.getLists(this.adminApis.loadGroupNames + this.accountform.controls['usr_cus_seq'].value)
      .toPromise()
      .then((params) => {
        let list = JSON.parse(params["_body"]);
          list.forEach((groupItem) => {
            groupItem.label = groupItem.grp_nm;
            groupItem.value = groupItem.grp_seq;
            this.grp_seq_options.push(groupItem);
          });
      })
      .catch((error) => { console.log(error); });
  }

  confirmID() {
    if (!this.accountform.value['usr_id']) {
      this.checkInput = true;
    } else if (this.accountform.get('usr_id').valid) {
      const inputId:string = this.accountform.value['usr_id'];
      this.userService.getLists(this.adminApis.checkDupUserId + inputId)
        .toPromise()
        .then((cont) => {
          this.showIdDupMsg = true;
          this.ableID = cont["_body"] === 'true';
          this.passDup = true;
        })
        .then(() => {
          if (this.ableID) {
            document.getElementById('dup_btn').style.background = 'rgb(221, 221, 221)';
            document.getElementById('dup_btn').style.cursor = 'auto';
          }
        })
    }
  }
  checkValue(e, field:string='') {
    this.checkInput = false;
    this.ableID = false;
    this.passDup = false;
    document.getElementById('dup_btn').style.background = 'white';
    document.getElementById('dup_btn').style.cursor = 'pointer';
    this.checkPatternEn = !e.valid && e.errors.pattern;
  }

  loadAccountList() {
    this.userService.getLists(this.adminApis.loadUser + this.params.index)
      .toPromise()
      .then((data) => {
          const getData:any[] = JSON.parse(data["_body"]);
          this.accountform.get('usr_seq').setValue(getData['usr_seq']);
          this.accountform.get('cus_nm_ko').setValue(getData['cus_nm_ko']);
          this.accountform.get('grp_nm').setValue(getData['grp_nm']);
          this.accountform.get('usr_id').setValue(getData['usr_id']);
          this.accountform.get('usr_nm').setValue(getData['usr_nm']);
          this.accountform.get('usr_mobile').setValue(getData['usr_mobile']);
          this.accountform.get('usr_tel').setValue(getData['usr_tel']);
          this.accountform.get('usr_use_yn').setValue(getData['usr_use_yn']);
          this.accountform.get('usr_remark').setValue(getData['usr_remark']);
       });
  }
}
