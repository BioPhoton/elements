import {Component, Input, Output, ViewEncapsulation} from '@angular/core';
import {Subject} from 'rxjs';
import {environment} from "../environments/environment";

@Component({
  template: `
      <h2>Elements WebComponent</h2>
  `,
  styles: environment.encapsulation === ViewEncapsulation.None ? [] :
    [`
      h1 { color: lightcoral; }
      h2 { color: lightgreen; }
    `],
  encapsulation: environment.encapsulation,
  changeDetection: environment.changeDetection
})
export class WebComponent {
  @Input() value: string;
  @Output() update = new Subject();

  constructor() {

  }
}
