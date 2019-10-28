import {Injector, NgModule, Type} from '@angular/core';
import {environment} from '../environments/environment';
import {createCustomElement} from '@angular/elements';
import {WebComponent} from './web.component';
import {BrowserModule} from "@angular/platform-browser";

export const ANGUlAR_ELEMENTS: { [key: string]: Type<any> } = {
  'web-component': WebComponent,
};
export const DECLARATIONS = [WebComponent];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    BrowserModule
  ],
  entryComponents: [DECLARATIONS]
})
export class ProviderAppModule {
  customElementComponent = ANGUlAR_ELEMENTS;

  constructor(private injector: Injector) {

  }

  ngDoBootstrap(): void {
      Object.entries(ANGUlAR_ELEMENTS).forEach(([selector, componentClass]) => {
        const element = createCustomElement(componentClass, {injector: this.injector});
        customElements.define(selector, element);
      });
  }

}
