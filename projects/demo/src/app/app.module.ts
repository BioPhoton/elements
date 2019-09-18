import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NgZone} from '@angular/core';

import {AppComponent} from './app.component';
import {LazyElementsModule} from '@angular-extensions/elements';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    FormsModule,
    LazyElementsModule
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private ngZone: NgZone) {
    // Comment in to pass parent zone to web components
    (window as any).ngZone = this.ngZone;
  }
}
