import {NgModule, NgZone} from '@angular/core';
import {LazyElementModuleRootOptions, LazyElementsModule} from '@angular-extensions/elements';
import {ElementsLoadingComponent} from './elements-loading.component';
import {ElementsErrorComponent} from './elements-error.component';

const BASIC_ELEMENTS_URL = 'elements/main.js';
const lazyElementsOptions: LazyElementModuleRootOptions = {
  elementConfigs: [
    { tag: 'ui-form', url: BASIC_ELEMENTS_URL },
    { tag: 'ui-overview', url: BASIC_ELEMENTS_URL }
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
