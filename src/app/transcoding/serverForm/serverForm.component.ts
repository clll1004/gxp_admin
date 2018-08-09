/**
 * Created by GRE511 on 2018-07-13.
 */
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TranscodingService } from '../../services/apis/adm/transcoding/transcoding.service';
import { AdminApis } from '../../services/apis/apis';

@Component({
  selector: 'serverForm',
  templateUrl: './serverForm.component.html',
  styleUrls: ['../transcoding.component.scss'],
  providers: [ TranscodingService, AdminApis ]
})
export class ServerFormComponent implements OnInit {
  @Input() params: object;

  public serverform: FormGroup;
  public submitted: boolean;

  public showIPDupMsg: boolean = false;
  public ableIP: boolean = false;

  /*for check add page*/
  public isAddPage: boolean = true;

  constructor(private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder,
              private router: Router,
              private transcodingService: TranscodingService,
              private adminApis: AdminApis) { }

  ngOnInit() {
    this.activatedRoute.url.subscribe((urlItem) => {
      this.isAddPage = urlItem[2].path === 'add';
    });
    this.serverform = this.formBuilder.group({
      'ts_seq': new FormControl(null),
      'ts_ip': new FormControl(null, Validators.required),
      'ts_type': new FormControl('G', Validators.required),
      'ts_use_yn': new FormControl('Y', Validators.required),
      'ts_desc': new FormControl(null, Validators.maxLength(100))
    });

    this.load();
  }

  goBack() {
    this.router.navigate(['/transcoding', 'server']);
  }

  onSubmit(formObject: any) {
    const valueObject = {};
    this.submitted = true;

    if(this.isAddPage) {
      Object.entries(formObject).forEach((item) => {
        if(item[0] !== 'ts_seq' && item[1]) {
          valueObject[item[0]] = item[1];
        }
      });
      this.transcodingService.postData(this.adminApis.postServer, valueObject)
        .toPromise()
        .then(() => {
          alert('완료되었습니다.');
          this.router.navigate(['/transcoding', 'server']);
        })
        .catch((error) => { console.log(error);});
    } else {
      this.transcodingService.updateData(this.adminApis.updateServer, formObject)
        .toPromise()
        .then(() => {
          alert('수정 완료되었습니다.');
          window.location.reload();
        })
        .catch((error) => { console.log(error);});
    }
  }

  load() {
    if(!this.isAddPage) {
      this.loadServerData();
    }
  }

  loadServerData() {
    this.transcodingService.getLists(this.adminApis.loadServer + this.params['index'])
      .toPromise()
      .then((data) => {
        const getData = JSON.parse(data['_body']);
        this.serverform.get('ts_seq').setValue(getData.ts_seq);
        this.serverform.get('ts_ip').setValue(getData.ts_ip);
        this.serverform.get('ts_type').setValue(getData.ts_type);
        this.serverform.get('ts_use_yn').setValue(getData.ts_use_yn);
        this.serverform.get('ts_desc').setValue(getData.ts_desc);
      });
  }
  confirmIP() {
    this.showIPDupMsg = true;
    const inputIP:string = this.serverform.value['ts_ip'];
    this.transcodingService.getLists(this.adminApis.checkDupTransServerIp + inputIP)
      .toPromise()
      .then((cont) => {
        this.ableIP = cont['_body'] === 'true';
      });
  }
}
