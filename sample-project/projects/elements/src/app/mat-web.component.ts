import {ChangeDetectionStrategy, Component, Input, Output, ViewEncapsulation} from '@angular/core';
import {Subject} from 'rxjs';
import {environment} from "../environments/environment";

@Component({
  template: `
      <h1 id="mat-web-component-h1">MatWebComponent</h1>
      <p>@Input() value: {{value | json}}</p>
      <br/>
      <mat-form-field>
          <input matInput
                 placeholder="Favorite food"
                 [value]="value"
                 (input)="event.next($event)">
      </mat-form-field>
  `,
  styles: [ `h1 { color:deepskyblue }` ],
  encapsulation: environment.encapsulation,
  changeDetection: ChangeDetectionStrategy.Default
})
export class MatWebComponent {
  @Input() value = '';
  @Output() event = new Subject();
}
