import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule, MatNativeDateModule} from '@angular/material';
import {ReactiveFormsModule} from "@angular/forms";
import {DynamicFormsMaterialUIModule} from "@ng-dynamic-forms/ui-material";
import {DynamicFormsCoreModule} from "@ng-dynamic-forms/core";

export const UI_FORM_MODULES = [
  BrowserAnimationsModule,
  ReactiveFormsModule,
  DynamicFormsCoreModule,
  DynamicFormsMaterialUIModule,
  MatNativeDateModule,
  MatCardModule
];
