import {Injector, NgModule, Type} from '@angular/core';
import {MW_PRE_COMPILED_MODULES} from './mat-web-component-modules';
import {createCustomElement} from '@angular/elements';
import {MatWebComponent} from './mat-web.component';

export const ANGUlAR_ELEMENTS: { [key: string]: Type<any> } = {
  'mat-web-component': MatWebComponent
};
export const DECLARATIONS = [MatWebComponent];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    MW_PRE_COMPILED_MODULES,
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
