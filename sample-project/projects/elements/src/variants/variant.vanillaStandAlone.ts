import {
  ChangeDetection,
  CompilationTypes,
  EsVersions,
  polyfillsShipped,
  runtimeShipped,
  scriptsShipped,
  ViewEncapsulation,
  ZoneHandling
} from 'angular-element-variants';

export const variant = {
  name: 'vanillaStandAlone',
  // outputPath: '',
  // bundleName: '',
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetection.Default,
  zone: ZoneHandling.Shipped,
  compilation: CompilationTypes.preCompiled,
  runtime: !runtimeShipped,
  polyfills: !polyfillsShipped,
  scripts: !scriptsShipped,
  esVersion: EsVersions.es2015
};
