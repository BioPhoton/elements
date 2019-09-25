import {ChangeDetectionStrategy, Component, Input, NgZone, Output, ViewEncapsulation} from '@angular/core';
import {Subject} from 'rxjs';
import {DynamicFormService} from "@ng-dynamic-forms/core";
import {environment} from "../environments/environment";

@Component({
  template: `
      <h1 id="dynamic-form-component-h1">DynamicFormWebComponent</h1>
      <form [formGroup]="formGroup">
          <dynamic-material-form
                  [group]="formGroup" [model]="_formModel"
                  (change)="change.next($event)"
                  [libCdOn]="['change']">
          </dynamic-material-form>
      </form>
  `,
  styleUrls: environment.encapsulation === ViewEncapsulation.None ? [] :
    ['./dynamic-form.component.scss'],
  encapsulation: environment.encapsulation,
  changeDetection: environment.changeDetection
})
export class DynamicFormWebComponent {
  formGroup = this.formService.createFormGroup([]);

  _formModel = [];
  @Input() set formModel(fM) {
    this._formModel = this.formService.fromJSON(fM);
    this.formGroup = this.formService.createFormGroup(this._formModel);
  };

  @Output() change = new Subject();

  constructor(private formService: DynamicFormService, private ngZone: NgZone) {
    console.log('ngZone:', this.ngZone);
  }
}
