import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule, MatNativeDateModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {DynamicFormsMaterialUIModule} from '@ng-dynamic-forms/ui-material';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';

export const DF_PRE_COMPILED_MODULES = [
  BrowserModule,
  BrowserAnimationsModule,
  CommonModule,
  ReactiveFormsModule,
  DynamicFormsMaterialUIModule,
  MatNativeDateModule,
  MatCardModule
];
