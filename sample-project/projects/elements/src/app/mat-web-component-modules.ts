import {MatFormFieldModule, MatInputModule} from '@angular/material';
import {FormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

export const MW_PRE_COMPILED_ONLY_MODULES = [
  BrowserAnimationsModule
];
export const MW_UN_COMPILED_MODULES = [
  FormsModule,
  MatFormFieldModule,
  MatInputModule
];

export const MW_PRE_COMPILED_MODULES = [
  MW_PRE_COMPILED_ONLY_MODULES,
  MW_UN_COMPILED_MODULES
];

