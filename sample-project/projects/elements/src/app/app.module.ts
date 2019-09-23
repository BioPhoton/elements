import {BrowserModule} from '@angular/platform-browser';
import {DoBootstrap, Injector, NgModule} from '@angular/core';
import {createCustomElement} from '@angular/elements';
import {UiOverviewComponent} from './ui-overview/ui-overview.component';
import {UI_OVERVIEW_MODULES} from './ui-overview/ui-overview-modules';
import {UiFormComponent} from './ui-form/ui-form.component';
import {UI_FORM_MODULES} from './ui-form/ui-form-modules';
import {WebComponent} from './web.component';
import {MatWebComponent} from './mat-web.component';
import {DynamicFormWebComponent} from './dynamic-form.component';
import {MatFormFieldModule, MatInputModule} from '@angular/material';
import {HelpersModule} from "../../../helpers/src/lib/helpers.module";

export const ANGUlAR_ELEMENTS: [any, string, any[]][] = [
  [UiOverviewComponent, 'ui-overview', UI_OVERVIEW_MODULES],
  [UiFormComponent, 'ui-form', UI_FORM_MODULES],
  [WebComponent, 'web-component', []],
  [MatWebComponent, 'mat-web-component', []],
  [DynamicFormWebComponent, 'dynamic-form-component', []]
];
export const MODULES = ANGUlAR_ELEMENTS.map(a => a[2]);
export const DECLARATIONS = [UiOverviewComponent, UiFormComponent, WebComponent, MatWebComponent, DynamicFormWebComponent];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [
    BrowserModule,
    MatFormFieldModule,
    MatInputModule,
    HelpersModule,
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
