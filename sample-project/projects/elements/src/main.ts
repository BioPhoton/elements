import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule, getCompilerOptions())
  .catch(err => console.error(err));

function getCompilerOptions() {
  const ngZone = (window as any).ngZone;
  if (ngZone) {
    return {ngZone};
  }
  return {};
}
