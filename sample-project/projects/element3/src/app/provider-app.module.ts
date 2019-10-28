import {Injector, NgModule, Type} from '@angular/core';
import {createCustomElement} from '@angular/elements';
import {DF_PRE_COMPILED_MODULES} from './dynamic-form-component-modules';
import {DynamicFormWebComponent} from './dynamic-form.component';

export const ANGUlAR_ELEMENTS: { [key: string]: Type<any> } = {
  'dynamic-form-component': DynamicFormWebComponent
};
export const DECLARATIONS = [DynamicFormWebComponent];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    DF_PRE_COMPILED_MODULES,
  ],
  entryComponents: [DECLARATIONS]
})
export class ProviderAppModule {

  constructor(private injector: Injector) {

  }

  ngDoBootstrap(): void {
      Object.entries(ANGUlAR_ELEMENTS).forEach(([selector, componentClass]) => {
        const element = createCustomElement(componentClass, {injector: this.injector});
        customElements.define(selector, element);
      });
  }

}
