import {
  ChangeDetection,
  CompilationTypes,
  EsVersions,
  VariantConfig,
  ViewEncapsulation,
  ZoneHandling
} from 'angular-element-variants';

export const variant = {
  name: 'vanillaStandAlone',
  // applicationType: 'vanilla',
// ViewEncapsulation: 0 = Emulated | 1 = Native | 2 = None | 3 = ShadowDom
  encapsulation: ViewEncapsulation.ShadowDom,
// ChangeDetection: 0 = OnPush | 1 = Default
  changeDetection: ChangeDetection.Default,
// ZoneHandling: 'None' | 'Injected' | 'Shipped' | 'Scoped'
  zone: ZoneHandling.Shipped,
// CompilationTypes: 'preCompiled' | 'unCompiled'
  compilation: CompilationTypes.preCompiled,
// runtimeShipped: true | false
  runtime: false,
// polyfillsShipped: true | false
  polyfills: false,
// scriptsShipped: true | false
  scripts: false,
  // EsVersions: 'es5' | 'es2015'
  esVersion: EsVersions.es2015
};
