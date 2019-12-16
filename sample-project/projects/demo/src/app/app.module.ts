import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NgZone} from '@angular/core';

import {AppComponent} from './app-component/app.component';
import {FormsModule} from '@angular/forms';
import {HelpersModule} from '../../../helpers/src/lib/helpers.module';
import {AngularElementsModule} from './angular-elements/angular-elements.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {setupGlobalCompilerOptions} from 'angular-element-variants';
import {
  MatButtonModule,
  MatExpansionModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import {LayoutModule} from '@angular/cdk/layout';

const matModules = [
  BrowserAnimationsModule,
  LayoutModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatExpansionModule,
  MatButtonModule
];

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
    matModules
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private ngZone: NgZone) {
    setupGlobalCompilerOptions({ngZone: this.ngZone});
  }

}
