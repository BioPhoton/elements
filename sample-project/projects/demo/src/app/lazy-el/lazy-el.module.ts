import {NgModule, NgModuleFactoryLoader, SystemJsNgModuleLoader} from '@angular/core';
import {fakeMatcher, NgxLazyElModule} from '@juristr/ngx-lazy-el';

// @TODO If this approach is used in production we need to load a bundles file from a url
export const lazyConfig = [
  {
    selector: 'web-component',
    matcher: fakeMatcher,
    loadChildren: () => import('../../../../elements/src/app/provider-app.module')
      .then(m => m.ProviderAppModule)
  }
];

@NgModule({
  imports: [
    NgxLazyElModule.forRoot(lazyConfig),
  ],
  providers: [
    {provide: NgModuleFactoryLoader, useClass: SystemJsNgModuleLoader},
  ],
  exports: [
    NgxLazyElModule
  ]
})
export class LazyElModule {

}
