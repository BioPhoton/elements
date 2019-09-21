import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, Output} from '@angular/core';
import {interval, Observable, ReplaySubject, Subject} from 'rxjs';
import {tap} from "rxjs/operators";

@Component({
  template: `
      <h1>MatWebComponent</h1>
      <p>@Input() value: {{value$ | async | json}}</p>
      <p>interval:  {{i$ | async}}</p>
      <br/>
      <mat-form-field>
          <input matInput
                 placeholder="Favorite food"
                 [value]="value$ | async"
                 (focus)="cd$.next()"
                 (blur)="cd$.next()"
                 (input)="event.next($event)">
      </mat-form-field>
  `,
  // @NOTICE Change to .OnPush only works with reactive architecture atm
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatWebComponent {
  // CD helper
  // @TODO create rx pipe and a directive for changeDetection
  detectChanges = <T>(o$: Observable<T>): Observable<T> => o$
    .pipe(tap(() => this.cd.detectChanges()));
  cd$ = new Subject();

  // =========================================

  i$ = interval(500).pipe(this.detectChanges);

  value$ = new ReplaySubject<string>(1);
  @Input() set value(v: string | {primitive: any}) {
    this.value$.next((v as {primitive: any}).primitive);
  };

  @Output() event = new Subject();

  constructor(private cd: ChangeDetectorRef) {
    // trigger change detection as side effect for every next value
    this.cd$.pipe(this.detectChanges).subscribe()
  }

}
