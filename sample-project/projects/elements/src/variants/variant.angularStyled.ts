import {
  ChangeDetection,
  CompilationTypes,
  EsVersions,
  polyfillsShipped,
  runtimeShipped,
  scriptsShipped,
  ViewEncapsulation, ZoneHandling
} from 'angular-element-variants';

export const variant = {
  name: 'angularStyled',
  // outputPath: '',
  // bundleName: '',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetection.Default,
  zone: ZoneHandling.Injected,
  compilation: CompilationTypes.preCompiled,
  runtime: !runtimeShipped,
  polyfills: !polyfillsShipped,
  scripts: !scriptsShipped,
  esVersion: EsVersions.es2015
};
