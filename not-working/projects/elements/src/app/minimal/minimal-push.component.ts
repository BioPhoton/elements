import {Component, Input, Output} from '@angular/core';
import {ReplaySubject, Subject} from 'rxjs';

@Component({
  template: `
      <div>
          <h1>Minimal WebComponent (OnPush)</h1>
          eagerValue: {{value}}<br/>0
      </div>
  `,
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class MinimalPushWebComponent {

  @Input()
  value;



  constructor() {
  }

}
