import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, Injector, NgModule, NgZone} from '@angular/core';

import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {HelpersModule} from '../../../helpers/src/lib/helpers.module';
import {AngularElementsModule} from './angular-elements/angular-elements.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LazyElModule} from './lazy-el/lazy-el.module';
import {setUpGlobalCompilerOptions} from 'element-variants';

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
    setUpGlobalCompilerOptions();
  }
}
