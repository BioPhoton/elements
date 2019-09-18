import {ChangeDetectionStrategy, Component, Input, Output} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  template: `
      <h1>WebComponent</h1>
      <p>@Input() value: {{value | json}}</p>
      <button (click)="update.next(value)">trigger output</button>
  `,
  // @NOTICE Change to .OnPush only works with reactive architecture atm
  changeDetection: ChangeDetectionStrategy.Default
})
export class WebComponent {
  @Input() value: string;
  @Output() update = new Subject();
}
