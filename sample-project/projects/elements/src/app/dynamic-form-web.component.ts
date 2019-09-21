import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, Output} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {DynamicFormModel, DynamicFormService} from "@ng-dynamic-forms/core";
import {map, share, tap} from "rxjs/operators";
import {FormGroup} from "@angular/forms";

@Component({
  template: `
      <h1>DynamicFormWebComponent</h1>
      <form [formGroup]="formGroup$ | async">
          <dynamic-material-form
                  [group]="formGroup$ | async" [model]="formModel$ | async"
                  (click)="cd$.next()"
                  (focus)="cd$.next()"
                  (blur)="cd$.next()"
                  (input)="cd$.next()"
                  (change)="change.next($event)">
          </dynamic-material-form>
      </form>
  `,
  // @NOTICE Change to .OnPush only works with reactive architecture atm
  changeDetection: ChangeDetectionStrategy.Default
})
export class DynamicFormWebComponent {
  // CD helper
  // @TODO create rx pipe and a directive for changeDetection
  detectChanges = <T>(o$: Observable<T>): Observable<T> => o$
    .pipe(tap(() => this.cd.detectChanges()));
  cd$ = new Subject();

  // =========================================

  formModel$$ = new BehaviorSubject<DynamicFormModel>([]);
  @Input() set formModel(fM) {
    this.formModel$$.next(fM);
  };

  formModel$ = this.formModel$$
    .pipe(
      map(fM => this.formService.fromJSON(fM)),
    );

  formGroup$: Observable<FormGroup> = this.formModel$
    .pipe(
      map(fM => this.formService.createFormGroup(fM)),
      share()
    );

  @Output() change = new Subject();
  // @NOTE Optional form value changes can be used directly as @Output only needs a subscribe function
  // @Output() this.formGroup$
  //    .pipe(switchMap(formGroup => formGroup.valueChanges));

  constructor(private formService: DynamicFormService,
              private cd: ChangeDetectorRef) {
    // trigger change detection as side effect for every next value
    this.cd$.pipe(this.detectChanges).subscribe()
  }
}
