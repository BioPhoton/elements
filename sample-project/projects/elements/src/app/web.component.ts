import {ChangeDetectionStrategy, Component, Input, Output} from '@angular/core';
import {ReplaySubject, Subject} from 'rxjs';
import {withLatestFrom} from "rxjs/operators";

@Component({
  template: `
      <h1>WebComponent</h1>
      <p>@Input() value: {{value$ | async | json}}</p>
      <button (click)="update$.next($event)">trigger output</button>
      test: {{test}}
  `,
  // @NOTICE Change to .OnPush only works with reactive architecture atm
  changeDetection: ChangeDetectionStrategy.Default
})
export class WebComponent {
  test = 'test';

  value$ = new ReplaySubject<string>(1);
  @Input() set value(v: string) {
    console.log('wc set value', v);
    this.value$.next(v);
  }

  update$ = new Subject();
  @Output() update = this.update$
    .pipe(withLatestFrom(this.value$));
}
