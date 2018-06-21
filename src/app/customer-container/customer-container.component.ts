import { Component } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: 'customer-container',
  templateUrl: './customer-container.component.html'
})

export class CustomerContainerComponent {
  public params:Params;

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe( (params) => {
      this.params = params;
    });
  }
}


