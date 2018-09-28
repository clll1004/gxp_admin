import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss']
})
export class FormContainerComponent implements OnInit {
  @Input() params: object;
  public pathName: string = '';
  public subPathName: string = '';

  constructor() {}

  ngOnInit() {
    if (this.params['listId'] === 'customer') {
      this.pathName = '고객관리'
    } else if (this.params['listId'] === 'service') {
      this.pathName = '서비스관리'
    } else {
      this.pathName = 'CMS 계정관리'
    }
    if (this.params['subId'] === 'add') {
      this.subPathName = '등록'
    } else {
      this.subPathName = '상세'
    }
  }
}
