import {ChangeDetectionStrategy, Component, Input, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {environment} from "../environments/environment";

@Component({
  template: `
      <h1 id="web-component-h1">WebComponent</h1>
      <p>@Input() value: {{value | json}}</p>
      <button (click)="update.next(value)">trigger output</button>
  `,
  styles: [ `h1 { color:mediumvioletred }` ],
  encapsulation: environment.encapsulation,
  changeDetection: environment.changeDetection
})
export class WebComponent {
  @Input() value: string;
  @Output() update = new Subject();

  constructor() {
    console.log('environment: ', environment);
  }
}
