import { Component, Input } from '@angular/core';

@Component({
  selector: 'form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.scss']
})
export class FormContainerComponent {
  @Input() params: object;
  @Input() pathName: string = '';

  constructor() { }
}
