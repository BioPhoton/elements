import {Injector, NgModule, Type} from '@angular/core';
import {MW_PRE_COMPILED_MODULES, MW_UN_COMPILED_MODULES} from './mat-web-component-modules';
import {DF_PRE_COMPILED_MODULES, DF_UN_COMPILED_MODULES} from './dynamic-form-component-modules';
import {environment} from '../environments/environment';
import {createCustomElement} from '@angular/elements';
import {WebComponent} from './web.component';
import {MatWebComponent} from './mat-web.component';
import {DynamicFormWebComponent} from './dynamic-form.component';

export const ANGUlAR_ELEMENTS: { [key: string]: Type<any> } = {
  'web-component': WebComponent,
  'mat-web-component': MatWebComponent,
  'dynamic-form-component': DynamicFormWebComponent
};
export const DECLARATIONS = [
  WebComponent, MatWebComponent, DynamicFormWebComponent
];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    environment.preCompiled ? MW_PRE_COMPILED_MODULES : MW_UN_COMPILED_MODULES,
    environment.preCompiled ? DF_PRE_COMPILED_MODULES : DF_UN_COMPILED_MODULES
  ],
  entryComponents: [DECLARATIONS]
})
export class ProviderAppModule {
  customElementComponent = ANGUlAR_ELEMENTS;

  constructor(private injector: Injector) {

  }

  ngDoBootstrap(): void {
    if (environment.preCompiled) {
      Object.entries(ANGUlAR_ELEMENTS).forEach(([selector, componentClass]) => {
        const element = createCustomElement(componentClass, {injector: this.injector});
        customElements.define(selector, element);
      });
      console.log('Elements created in provider side');
    }
  }

}
