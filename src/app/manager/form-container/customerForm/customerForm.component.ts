import { Component, OnInit } from '@angular/core';
import { Validators,FormControl,FormGroup,FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { CustomerService } from '../../../services/apis/adm/customer/customer.service';
import { AdminApis } from '../../../services/apis/apis';
import { ConfirmationService } from 'primeng/components/common/api';

@Component({
  selector: 'customerForm',
  templateUrl: './customerForm.component.html',
  styleUrls: ['../form-container.component.scss'],
  providers: [CustomerService, AdminApis, ConfirmationService]})

export class CustomerFormComponent implements OnInit {
  params: Params;

  public customerform: FormGroup;
  public submitted: boolean;
  public isShowMessage: boolean = false;

  /*for check addpagebb row*/
  public isAddRow: boolean = true;
  public ableCustomerName:boolean = false;
  public showNameDupMsg: boolean = false;
  public checkPatternEn:boolean = false;
  public checkPatternKo:boolean = false;
  public checkInput:boolean = false;
  public passDup:boolean = false;

  constructor(private formBuilder: FormBuilder,
                private location: Location,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private customerService: CustomerService,
                private adminApis: AdminApis,
                private confirmationService: ConfirmationService) {
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

  onSubmit(formObject: any) {
    this.submitted = true;

    if (this.isAddRow) {
      this.customerService.postCustomer(formObject)
        .toPromise()
        .then(() => {
          this.confirmationService.confirm({
            message: '등록 완료되었습니다.',
            accept: () => {
              this.router.navigate(['/manager', 'customer']);
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      this.customerService.updateCustomer(formObject.cus)
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
    this.location.back();
  }

  confirmCustomerName() {
    if (!this.customerform.get('cus').value['cus_nm_en']) {
      this.checkInput = true;
    } else if (this.customerform.get('cus').get('cus_nm_en').valid) {
      const inputName:string = this.customerform.get('cus').value['cus_nm_en'];
      this.customerService.getLists(this.adminApis.checkDupCustomerName + inputName)
        .toPromise()
        .then((cont) => {
          this.showNameDupMsg = true;
          this.ableCustomerName = cont._body === 'true';
          this.passDup = true;
        })
        .then(() => {
          if (this.ableCustomerName) {
            document.getElementById('dup_btn').style.background = 'rgb(221, 221, 221)';
            document.getElementById('dup_btn').style.cursor = 'auto';
          }
        })
    }
  }

  checkValue(e, field:string='') {
    this.checkInput = false;
    this.ableCustomerName = false;
    this.passDup = false;
    document.getElementById('dup_btn').style.background = 'white';
    document.getElementById('dup_btn').style.cursor = 'pointer';
    field === 'cus_en' ? this.checkPatternEn = !e.valid && e.errors.pattern : this.checkPatternKo = !e.valid && e.errors.pattern;
  }

  loadCustomerList() {
    this.customerService.getLists(this.adminApis.loadCustomer + this.params.index)
      .toPromise()
      .then((data) => {
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
}
