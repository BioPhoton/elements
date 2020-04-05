import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { ProviderAppModule } from './app/provider-app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(ProviderAppModule, getCompilerOptions())
  .catch(err => console.error(err));

console.log('EL1 Provider environment name:', environment.name);
console.log('EL1 Provider encapsulation: ', getEncapsulation(environment.encapsulation));
console.log('EL1 Provider changeDetection: ', environment.changeDetection === 0 ? 'Default' : 'OnPush');
console.log('EL1 Provider compilerOptions:', getCompilerOptions());

function getCompilerOptions() {
  // If consumer app offers a setting (can be controlled or stand-alone)
  const ngZone = (window as any).ngZone;
  if (ngZone) {
    return {ngZone};
  }
  // If configuration is zone-less (can be controlled or stand-alone)
  // if(environment.zoneLess) {}
  return {};
}

function getEncapsulation(encapsulation) {
  if (encapsulation === 0) {
    return 'Emulated';
  }
  if (encapsulation === 1) {
    return 'Native';
  }
  if (encapsulation === 2) {
    return 'None';
  }
  if (encapsulation === 3) {
    return 'ShadowDom';
  }
  return 'WRONG ENCAPSULATION!!';
}