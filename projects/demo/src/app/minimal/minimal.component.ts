import {ChangeDetectionStrategy, Component, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {ReplaySubject, Subject} from 'rxjs';

@Component({
  selector: 'app-mimimal',
  template: `
      <div>
          <h1>Minimal Component</h1>
          eagerValue: {{value | json}}<br/>
          observableValue: {{value$ | async | json}}<br/>
          <button (click)="update.next(value)">event</button>
      </div>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MinimalComponent {

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
