import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

const ngZone = (window as any).ngZone;
let compilerOptions = {};
if (ngZone) {
  compilerOptions = {ngZone};
}

console.log('compilerOptions for elements:', compilerOptions);
platformBrowserDynamic()
  .bootstrapModule(AppModule, compilerOptions)
  .catch(err => console.error(err));
