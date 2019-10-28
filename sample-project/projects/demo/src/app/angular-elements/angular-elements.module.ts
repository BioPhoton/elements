import {NgModule, NgZone} from '@angular/core';
import {LazyElementModuleRootOptions, LazyElementsModule} from '@angular-extensions/elements';
import {ElementsLoadingComponent} from './elements-loading.component';
import {ElementsErrorComponent} from './elements-error.component';

const BASIC_ELEMENTS_URL = 'elements/main.js';
const ELEMENT1_URL = 'element1/main.js';
const ELEMENT2_URL = 'element2/main.js';
const ELEMENT3_URL = 'element3/main.js';
const SPECIAL_ELEMENTS_URL = 'elements-special/main.js';
const SPECIAL_ELEMENTS_CONFIG = [
  {tag: 'ui-form', url: SPECIAL_ELEMENTS_URL},
  {tag: 'ui-overview', url: SPECIAL_ELEMENTS_URL}
];
const lazyElementsOptions: LazyElementModuleRootOptions = {
  elementConfigs: [
    // ...SPECIAL_ELEMENTS_CONFIG,
    {tag: 'variant-config', url: BASIC_ELEMENTS_URL},
    {tag: 'web-component', url: BASIC_ELEMENTS_URL},
    {tag: 'mat-web-component', url: BASIC_ELEMENTS_URL},
    {tag: 'dynamic-form-component', url: BASIC_ELEMENTS_URL}
  ],
  rootOptions: {
    loadingComponent: ElementsLoadingComponent,
    errorComponent: ElementsErrorComponent
  }
};

@NgModule({
  declarations: [ElementsLoadingComponent, ElementsErrorComponent],
  imports: [
    LazyElementsModule.forRoot(lazyElementsOptions)
  ],
  exports: [
    LazyElementsModule
  ]
})
export class AngularElementsModule {
  constructor(private ngZone: NgZone) {
    // Comment in to pass parent zone to web components
    // Options: 'noop' | this.ngZone
    (window as any).ngZone = this.ngZone;
  }
}
