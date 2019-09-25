import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule, MatNativeDateModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {DynamicFormsMaterialUIModule} from '@ng-dynamic-forms/ui-material';
import {CommonModule} from "@angular/common";

export const DF_PRE_COMPILED_ONLY_MODULES = [
  BrowserAnimationsModule
];
export const DF_UN_COMPILED_MODULES = [
  CommonModule,
  ReactiveFormsModule,
  DynamicFormsMaterialUIModule,
  MatNativeDateModule,
  MatCardModule
];
export const DF_PRE_COMPILED_MODULES = [
  DF_PRE_COMPILED_ONLY_MODULES,
  DF_UN_COMPILED_MODULES
];
