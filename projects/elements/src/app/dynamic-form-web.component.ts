import {ChangeDetectionStrategy, Component, Input, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {DynamicFormService} from "@ng-dynamic-forms/core";

@Component({
  template: `
      <h1>DynamicFormWebComponent</h1>
      <form [formGroup]="formGroup">
          <dynamic-material-form
                  [group]="formGroup" [model]="_formModel"
                  (change)="change.next($event)">
          </dynamic-material-form>
      </form>
  `,
  // @NOTICE Change to .OnPush only works with reactive architecture atm
  changeDetection: ChangeDetectionStrategy.Default
})
export class DynamicFormWebComponent {
  formGroup = this.formService.createFormGroup([]);

  _formModel = [];
  @Input() set formModel(fM) {
    this._formModel = this.formService.fromJSON(fM);
    this.formGroup = this.formService.createFormGroup(this._formModel);
  };

  @Output() change = new Subject();

  constructor(private formService: DynamicFormService) {

  }
}
