import {BrowserModule} from '@angular/platform-browser';
import {ApplicationRef, DoBootstrap, Injector, NgModule} from '@angular/core';
import {createCustomElement} from '@angular/elements';
import {WebComponent} from './web.component';

export const elements: any[] = [
  [WebComponent, 'web-component']
];
export const DECLARATIONS = elements.map(a => a[0]);

@NgModule({
  declarations: [DECLARATIONS],
  imports: [BrowserModule],
  entryComponents: [DECLARATIONS]
})
export class AppModule implements DoBootstrap {

  constructor(private injector: Injector) {

  }

  ngDoBootstrap(appRef: ApplicationRef): void {
    elements.forEach(([componentClass, selector]) => {
      const el = createCustomElement(componentClass, {injector: this.injector});
      customElements.define(selector, el);
    });
  }

}
