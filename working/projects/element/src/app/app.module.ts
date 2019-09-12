import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { WebComponent } from './web.component';
import { createCustomElement } from '@angular/elements';

@NgModule({
  imports: [BrowserModule],
  declarations: [WebComponent],
  entryComponents: [WebComponent]
})
export class AppModule implements DoBootstrap {

  constructor(private injector: Injector) {
  }

  ngDoBootstrap() {
    const GithubReposElement = createCustomElement(WebComponent, { injector: this.injector });
    customElements.define('web-component', GithubReposElement);
  }

}
