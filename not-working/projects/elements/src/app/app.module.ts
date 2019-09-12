import {BrowserModule} from '@angular/platform-browser';
import {ApplicationRef, DoBootstrap, Injector, NgModule} from '@angular/core';
import {MinimalWebComponent} from './minimal/minimal.component';
import {createCustomElement} from '@angular/elements';
import {MinimalPushWebComponent} from './minimal/minimal-push.component';

export const elements: any[] = [
  [MinimalWebComponent, 'ui-minimal'],
  [MinimalPushWebComponent, 'ui-minimal-push']
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
    console.log('elements bootstrapped!');
  }

}

console.log('elements loaded!');
