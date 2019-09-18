import {BrowserModule} from '@angular/platform-browser';
import {ApplicationRef, DoBootstrap, Injector, NgModule} from '@angular/core';
import {createCustomElement} from '@angular/elements';
import {WebComponent} from './web.component';
import {MatWebComponent} from "./mat-web.component";
import {DynamicFormWebComponent} from "./dynamic-form-web.component";
import {DYNAMIC_FORM_MODULES} from "./dynamic-form-modules";
import {MAT_INPUT_MODULES} from "./mat-input-modules";

export const ANGUlAR_ELEMENTS: any[] = [
  [WebComponent, 'web-component'],
  [MatWebComponent, 'mat-web-component'],
  [DynamicFormWebComponent, 'dynamic-form-web-component']
];
export const DECLARATIONS = ANGUlAR_ELEMENTS.map(a => a[0]);

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    BrowserModule,
    MAT_INPUT_MODULES,
    DYNAMIC_FORM_MODULES
  ],
  entryComponents: [DECLARATIONS]
})
export class AppModule implements DoBootstrap {

  constructor(private injector: Injector) {

  }

  ngDoBootstrap(appRef: ApplicationRef): void {
    ANGUlAR_ELEMENTS.forEach(([componentClass, selector]) => {
      const element = createCustomElement(componentClass, {injector: this.injector});
      customElements.define(selector, element);
    });
  }

}
