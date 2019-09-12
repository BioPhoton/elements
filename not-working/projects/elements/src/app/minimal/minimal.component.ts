import {Component, Input, Output} from '@angular/core';
import {ReplaySubject, Subject} from 'rxjs';

@Component({
  template: `
      <div>
          <h1>Minimal WebComponent</h1>
          eagerValue: {{value | json}}<br/>
          observableValue: {{value$ | async | json}}<br/>
          <button (click)="update.next(value)">event</button>
      </div>
  `
})
export class MinimalWebComponent {

  @Input()
  value;

  value$ = new ReplaySubject(1);
  @Input()
  set oValue(v) {
    this.value$.next(v);
  }

  @Output()
  update = new Subject();

  constructor() {
  }

}
