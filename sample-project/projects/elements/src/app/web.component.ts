import {Component, Input, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {variant} from '../variants/variant';
import {ViewEncapsulation} from '../../../element-variants/src/interfaces/variant-config.interface';

@Component({
  template: `
      <h2>Elements WebComponent</h2>
  `,
  styles: variant.encapsulation === ViewEncapsulation.None ? [] :
    [`
      h1 { color: lightcoral; }
      h2 { color: lightgreen; }
    `],
  encapsulation: variant.encapsulation as any,
  changeDetection: variant.changeDetection as any
})
export class WebComponent {
  @Input() value: string;
  @Output() update = new Subject();

  constructor() {

  }
}
