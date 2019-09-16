import {ChangeDetectionStrategy, Component, Input, Output} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  template: `
      <h1>WebComponent</h1>
      <p>@Input() value: {{value | json}}</p>
        <button (click)="update.next(value)">trigger output</button>
  `,
  // Change to .OnPush to see CD not working
  changeDetection: ChangeDetectionStrategy.Default
})
export class WebComponent {
  @Input() value: string;
  @Output() update = new Subject();
}
