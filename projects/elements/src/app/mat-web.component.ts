import {ChangeDetectionStrategy, Component, Input, Output} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  template: `
      <h1>MatWebComponent</h1>
      <p>@Input() value: {{value | json}}</p>
      <br/>
      <mat-form-field>
          <input matInput
                 placeholder="Favorite food"
                 [value]="value"
                 (input)="event.next($event)">
      </mat-form-field>
  `,
  // @NOTICE Change to .OnPush only works with reactive architecture atm
  changeDetection: ChangeDetectionStrategy.Default
})
export class MatWebComponent {
  @Input() value: string;
  @Output() event = new Subject();
}
