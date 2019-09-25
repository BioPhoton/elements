import {BrowserModule} from '@angular/platform-browser';
import {DoBootstrap, Injector, NgModule} from '@angular/core';
import {createCustomElement} from '@angular/elements';
import {UI_FORM_MODULES} from './ui-form/ui-form-modules';
import {UiFormComponent} from './ui-form/ui-form.component';
import {UI_OVERVIEW_MODULES} from './ui-overview/ui-overview-modules';
import {UiOverviewComponent} from './ui-overview/ui-overview.component';

export const ANGUlAR_ELEMENTS: [any, string, any[]][] = [
  [UiOverviewComponent, 'ui-overview', UI_OVERVIEW_MODULES],
  [UiFormComponent, 'ui-form', UI_FORM_MODULES],
];
export const DECLARATIONS = [
  UiOverviewComponent, UiFormComponent
];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    BrowserModule,
    UI_OVERVIEW_MODULES,
    UI_FORM_MODULES
  ],
  entryComponents: [DECLARATIONS]
})
export class AppModule implements DoBootstrap {

  constructor(private injector: Injector) {

  }

  ngDoBootstrap(): void {
    ANGUlAR_ELEMENTS.forEach(([componentClass, selector]) => {
      const element = createCustomElement(componentClass, {injector: this.injector});
      customElements.define(selector, element);
    });
  }

}
