import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'manager',
  templateUrl: './manager.component.html'})

export class ManagerComponent {
  public params:Params;
  public isShow:boolean = true;

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe( (params) => {
      this.params = params;
    });

    this.activatedRoute.url.subscribe((urlItem) => {
      urlItem.length == 2 ? this.isShow = true : this.isShow = false;
    });
  }


}


