import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule, NgModuleFactoryLoader, NgZone} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {HelpersModule} from '../../../helpers/src/lib/helpers.module';
import {AngularElementsModule} from './angular-elements/angular-elements.module';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {lazyConfig, LazyElModule} from './lazy-el/lazy-el.module';
import {NgxLazyElModule} from "@juristr/ngx-lazy-el";

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // @NOTE this is here for un-compiled lazy-loaded material web components
    BrowserAnimationsModule,
    FormsModule,
    HelpersModule,
    AngularElementsModule,
    LazyElModule,
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private ngZone: NgZone, private injector: Injector) {
    (window as any).ngZone = this.ngZone;
    (window as any).injector = this.injector;
    console.log('Consumer provided injector: ', (window as any).injector);
    console.log('Consumer zone usage: ', environment.zoneLess ? 'Zone-Less' : 'Zone-Full');
    console.log('Consumer provided zone: ', (window as any).ngZone);
  }

}
