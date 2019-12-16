import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {ProviderAppModule} from './app/provider-app.module';
import {environment} from './environments/environment';
import {variant} from './variants/variant';
import {getCompilerOptions} from 'angular-element-variants';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(ProviderAppModule, getCompilerOptions(variant as any))
  .catch(err => console.error(err));
