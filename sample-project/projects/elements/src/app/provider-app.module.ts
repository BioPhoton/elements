import {Injector, NgModule, NgZone, Type} from '@angular/core';
import {MAT_WEB_COMPONENT_MODULES} from './mat-web-component/mat-web-component-modules';
import {createCustomElement} from '@angular/elements';
import {WebComponent} from './web.component';
import {MatWebComponent} from './mat-web-component/mat-web.component';
import {DynamicFormWebComponent} from './dynamic-form-component/dynamic-form.component';
import {DYNAMIC_FORM_COMPONENT_MODULES} from './dynamic-form-component/dynamic-form-component-modules';
import {variant} from '../variants/variant';
import {VariantConfigComponent} from './variant/variant-config.component';
import {CompilationTypes} from '../../../element-variants/src/interfaces/variant-config.interface';

export const ANGUlAR_ELEMENTS: { [key: string]: Type<any> } = {
  'variant-config': VariantConfigComponent,
  'web-component': WebComponent,
  'mat-web-component': MatWebComponent,
  'dynamic-form-component': DynamicFormWebComponent
};
export const DECLARATIONS = [
  WebComponent, MatWebComponent, DynamicFormWebComponent,
  VariantConfigComponent
];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    MAT_WEB_COMPONENT_MODULES,
    DYNAMIC_FORM_COMPONENT_MODULES
  ],
  entryComponents: [DECLARATIONS]
})
export class ProviderAppModule {
  customElementComponent = ANGUlAR_ELEMENTS;

  constructor(private injector: Injector, private ngZone: NgZone) {
    console.log('Provider ngZone over constructor:', this.ngZone);
  }

  ngDoBootstrap(): void {
    console.log('PROV variant', variant);
    if (variant.compilation === CompilationTypes.preCompiled) {
      Object.entries(ANGUlAR_ELEMENTS).forEach(([selector, componentClass]) => {
        const element = createCustomElement(componentClass, {injector: this.injector});
        customElements.define(selector, element);
      });
      console.log('Elements created in provider side');
    }
  }

}
