import {Component, Input, Output, ViewEncapsulation} from '@angular/core';
import {DynamicFormControlModel, DynamicFormModel, DynamicFormService} from '@ng-dynamic-forms/core';
import {FormGroup} from '@angular/forms';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {map, shareReplay, tap, withLatestFrom} from 'rxjs/operators';

interface DynamicFormControlModelRaw extends DynamicFormControlModel {
  _value: string;
}

@Component({
  templateUrl: './ui-form.component.html',
  styleUrls: ['./ui-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UiFormComponent {

  formData$ = new BehaviorSubject<DynamicFormModel>([]);
  @Input() set formData(formData) {
    this.formData$.next(([] instanceof Array) ? formData : []);
  }

  formModel$ = this.formData$
    .pipe(
      map(formData => this.formService.fromJSON(formData))
    );

  formGroup$: Observable<FormGroup> = this.formModel$
    .pipe(
      map(fM => this.formService.createFormGroup(fM)),
      shareReplay(1)
    );

  formChange$ = new Subject();
  @Output()
  formChange = this.formChange$
    .pipe(
      withLatestFrom(this.formModel$),
      map(formModel => formModel
        .map((input: DynamicFormControlModelRaw) => input._value)
      )
    );

  constructor(private formService: DynamicFormService) {
  }

}
