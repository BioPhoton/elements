# Prove Of Concept for Angular elements and third party libs

@TODO /demo => /demo-angular

<!-- npm i -g markdown-toc && markdown-toc ./README.md -i -->

<!-- toc -->

  * [Project Setup and Build](#project-setup-and-build)
    + [Version Information](#version-information)
    + [Setup angular project structure](#setup-angular-project-structure)
    + [Setup Consumer Angular Project](#setup-consumer-angular-project)
    + [Setup Consumer Vanilla Project](#setup-consumer-vanilla-project)
    + [Setup Provider Project](#setup-provider-project)
      - [Setup Variants Bundling](#setup-variants-bundling)
    + [Setup for Lazy Loading of Elements](#setup-for-lazy-loading-of-elements)
      - [Setup Consumer Application to Lazy Load Elements](#setup-consumer-application-to-lazy-load-elements)
      - [Setup Provider Application to Lazy Load Elements](#setup-provider-application-to-lazy-load-elements)
    + [Setup for Angular Material](#setup-for-angular-material)
    + [Setup for Angular Dynamic Forms](#setup-for-angular-dynamic-forms)
  * [ZoneHandling and Angular Elements](#zonehandling-and-angular-elements)
    + [Zone-less](#zone-less)
      - [Problems with Components when Running Zone Less](#problems-with-components-when-running-zone-less)
        * [Template Bindings](#template-bindings)
        * [Input Bindings](#input-bindings)
        * [Output Bindings](#output-bindings)
        * [Dom Events](#dom-events)
        * [Animations](#animations)
        * [Internal Logic](#internal-logic)
      - [Problems with WebComponents when Running Zone Less](#problems-with-webcomponents-when-running-zone-less)
    + [Zone-full](#zone-full)
      - [Parent-Zone Hack](#parent-zone-hack)
      - [Context-Aware-Zones-Zones](#context-aware-zones-zones)
      - [ViewEncapsulation and Styling](#viewencapsulation-and-styling)
    + [View Encapsulation with Option `None`](#view-encapsulation-with-option-none)
    + [View Encapsulation with Option `ShadowDom`](#view-encapsulation-with-option-shadowdom)
    + [View Encapsulation with Option `Emulated`](#view-encapsulation-with-option-emulated)
  * [Loading Strategies](#loading-strategies)
    + [Elements Pre-compiled Eager Loaded](#elements-pre-compiled-eager-loaded)
    + [Elements Pre-compiled Lazy Loaded](#elements-pre-compiled-lazy-loaded)
    + [Setup Elements Un-compiled Lazy Loaded](#setup-elements-un-compiled-lazy-loaded)
      - [Setup Provider Application for Un-Compiled Loading](#setup-provider-application-for-un-compiled-loading)
  * [Productivity Helpers](#productivity-helpers)
    + [Push Pipe](#push-pipe)
    + [Let Structural Directive](#let-structural-directive)
    + [CdOn Directive](#cdon-directive)
  * [Browser Support and Backwards Compatibility](#browser-support-and-backwards-compatibility)
  * [Performance](#performance)
    + [Bundling](#bundling)
    + [Unoptimized build like `ng serve`:](#unoptimized-build-like-ng-serve)
- [Angular Architect API](#angular-architect-api)
  * [Chunk Sets](#chunk-sets)

<!-- tocstop -->

In this documnet the goal is to wrap `@angular/material` components 
created over `@ng-dynamic-forms/core` and use it in another angular application.

Following things should be included:
- [x] **Setup and Build** (A detailed documentation on how to setup things)
- [x] **Working ChangeDetection** (ChangeDetection should work for all features. If possible zone-less)
- [x] **Developer Workflow** (A convenient developer workflow for serving and building)
- [x] **Styling Strategies** (Builds for all different variants of style encapsulation) 
- [x] **Loading strategies** (Loading of web components)
- [ ] **Productivity Helpers** (A general set of helpers for more convenience)    

## Project Setup and Build

### Version Information

Angular CLI: 8.3.3  
Node: 10.12.0  
OS: win32 x64  
Angular: 8.2.5  
... animations, common, compiler, compiler-cli, core, elements  
... forms, language-service, platform-browser  
... platform-browser-dynamic, router  
  

Package                           | Version  
----------------------------------|-------------------------  
@angular-devkit/architect         | 0.803.3  
@angular-devkit/build-angular     | 0.803.3  
@angular-devkit/build-ng-packagr  | 0.803.3  
@angular-devkit/build-optimizer   | 0.803.3  
@angular-devkit/build-webpack     | 0.803.3  
@angular-devkit/core              | 8.3.3  
@angular-devkit/schematics        | 8.3.3  
@angular/cdk                      | 8.2.0  
@angular/cli                      | 8.3.3  
@ngtools/webpack                  | 8.3.3  
@schematics/angular               | 8.3.3  
@schematics/update                | 0.803.3  
ng-packagr                        | 5.5.0  
rxjs                              | 6.4.0  
typescript                        | 3.5.3  
webpack                           | 4.39.2   
**Relevant modules starting here**| **version is pinned**
@angular/elements                 | 8.2.5
@angular-extensions/elements      | 8.7.0
@angular/material                 | 8.2.0
@ng-dynamic-forms/core            | 9.0.1
@ng-dynamic-forms/ui-material     | 9.0.1
angular2-text-mask                | 9.0.0
npm-run-all                       | 4.1.5
concat                            | 1.0.3
gzip-all                          | 1.0.0

Browser:

Name   | Version
-------|--------------
Chrome | 76.0.3809.132

### Setup angular project structure
1. `ng new elements --create-application false`

### Setup Consumer Angular Project 
1. `ng generate application demo-angular`
2. Add following lines to the scripts section in your `package.json` located in root level
```json
{
  ...
  "scripts": {
    ...
    "serve:demo-angular": "ng serve --project demo-angular",
    "build:demo-angular": "ng build --project demo-angular"
  },
  ...
}
```
3. Run 
```shell script
npm run serve:demo-angular
```
### Setup Consumer Vanilla Project 

1. Firs we have to generate a static app with as minimal configuration as possible.

```shell script
ng g app demo-vanilla --style=scss --minimal=true --routing=false --skip-tests=true
```
2. Open `/projects/demo-vanilla/src/polyfills.ts` and comment out the code related to `zone.js`.
```typescript

/***************************************************************************************************
 * Zone JS is required by default for Angular itself.
 */
import 'zone.js/dist/zone';  // Included with Angular CLI.
```
3. Open `angular.json` and replace the following settings:
Under `projects.demo-vanilla.architect.build.configurations.production` place:
```json
{
"fileReplacements": [
{
  "replace": "projects/demo-vanilla/src/environments/environment.ts",
  "with": "projects/demo-vanilla/src/environments/environment.prod.ts"
}
],
"optimization": true,
"sourceMap": false,
"extractCss": false,
"namedChunks": false,
"extractLicenses": true,
"vendorChunk": false,
"buildOptimizer": true,
"budgets": [
{
  "type": "initial",
  "maximumWarning": "2mb",
  "maximumError": "5mb"
},
{
  "type": "anyComponentStyle",
  "maximumWarning": "6kb",
  "maximumError": "10kb"
}
]
}
```
4. Delete all files in `app` under `projects/demo-vanilla/src`
5. Create an `index.ts` file  under `projects/demo-vanilla/src/app` and inset following content;
```typescript
console.log('Vanilla app started');
```

6. Replace the content of `main.ts` file  under `projects/demo-vanilla/src` with following content:
```typescript
import {init} from './app';

```
9. Add following lines to the scripts section in your `package.json` located in root level
```json
{
  ...
  "scripts": {
    ...
    "serve:demo-vanilla": "ng serve --project demo-vanilla",
    "build:demo-vanilla": "ng build --project demo-vanilla"
  },
  ...
}
```
10. Run 
```shell script
npm run "serve:demo-vanilla": "ng serve --project demo-vanilla"
``` 
You should see the output in the console.
### Setup Provider Project
1. `ng generate application elements`
2. Open `/projects/elements/src/polyfills.ts` and comment out the code related to `zone.js`.
```typescript

/***************************************************************************************************
 * Zone JS is required by default for Angular itself.
 */
import 'zone.js/dist/zone';  // Included with Angular CLI.
```
3. `ng add @angular/elements --project elements`
4. `ng add ngx-build-plus --project elements`
5. Create new file in root named `proxy.conf.json` and insert following content 
```json
{
  "/elements": {
    "target": "http://localhost:4300",
    "secure": false,
    "pathRewrite": {
      "^/elements": ""
    },
    "logLevel": "debug"
  }
}
```
6. Add `proxy.config.json` to `angular.json`. 
Under `projects.demo.architect.serve.options` in `angular.json`:

```json
{
  ...
  "proxyConfig": "proxy.conf.json"
}

```
7. Insert the following under `elements.architect.serve.options` in `angular.json`:
```typescript 
 "port": 4242
```
#### Setup Variants Bundling
1. `npm i angular-element-variants --save`

2. create a  folder `tooling` under root
3. In the folder `tooling` create a file `angular-element-variants.ts` and insert following content:
```typescript
import {getVariantsPlugin} from 'angular-element-variants/index.tooling';

const variantsPlugin = getVariantsPlugin();
export default variantsPlugin;
```
4. create a file `tsconfig.tooling.json` and insert following config:
```json
{

  "esModuleInterop": true,
  "compilerOptions": {
    "baseUrl": "../",
    "outDir": "../dist/tooling",
    "target": "es5",
    "module": "commonjs",
    "allowJs": true,
    "lib": [
      "dom",
      "es2015",
      "esnext"
    ],
    "sourceMap": false,
    "strict": false,
    "moduleResolution": "node",
    "typeRoots": [
      "node_module/@types"
    ]
  },
  "files": [
    "angular-element-variants.plugin.ts"
  ]
}
```

5. Insert the following under `elements.architect.build.options` in `angular.json`:
```json 
 "plugin": "~dist/tooling/tooling/angular-element-variants.plugin"
```
6. Insert the following under `elements.architect.build.configurations` in `angular.json`:
```json 
 "angularStyled": {
   "outputPath": "dist/elements-angular-styled",
   "fileReplacements": [
     {
       "replace": "projects/elements/src/environments/environment.ts",
       "with": "projects/elements/src/environments/environment.prod.ts"
     },
     {
       "replace": "projects/elements/src/variants/variant.ts",
       "with": "projects/elements/src/variants/variant.angularStyled.ts"
     }
   ],
   "optimization": true,
   "sourceMap": false,
   "namedChunks": false,
   "aot": true,
   "extractLicenses": true,
   "vendorChunk": false,
   "buildOptimizer": true
 },
 ...
```
7. Insert the following under `elements.architect.serve.options` in `angular.json`:
```json 
 "plugin": "~dist/tooling/tooling/angular-element-variants.plugin"
```
8. Insert the following under `elements.architect.serve.configurations` in `angular.json`:
```json 
"angularStyled": {
    "browserTarget": "elements:build:serveAngularStyled",
    "fileReplacements": [
      {
        "replace": "projects/elements/src/variants/variant.ts",
        "with": "projects/elements/src/variants/variant.angularStyled.ts"
      }
    ]
},
```
9. Create a folder `variants` under `projects/elements/src`
10. In the folder `variants` create a file `variant.ts` and insert following content:
```typescript
import {
  ChangeDetection,
  CompilationTypes,
  EsVersions,
  VariantConfig,
  ViewEncapsulation,
  ZoneHandling
} from 'angular-element-variants';

export const variant: VariantConfig = {
  name: 'defaultVariant',
  // ApplicationType: 'angular' | 'vanilla' | 'unknown'
  applicationType: 'unknown',
// ViewEncapsulation: 0 = Emulated | 1 = Native | 2 = None | 3 = ShadowDom
  encapsulation: ViewEncapsulation.ShadowDom,
// ChangeDetection: 0 = OnPush | 1 = Default
  changeDetection: ChangeDetection.OnPush,
// ZoneHandling: 'None' | 'Injected' | 'Shipped' | 'Scoped'
  zone: ZoneHandling.Shipped,
// CompilationTypes: 'preCompiled' | 'unCompiled'
  compilation: CompilationTypes.preCompiled,
// runtimeShipped: true | false
  runtime: true,
// polyfillsShipped: true | false
  polyfills: false,
// scriptsShipped: true | false
  scripts: false,
  // EsVersions: 'es5' | 'es2015'
  esVersion: EsVersions.es2015
};
```
11. In the folder `variants` create another file `variant.angularStyled.ts` and insert following content:
```typescript
import {ChangeDetection, CompilationTypes, EsVersions, ViewEncapsulation, ZoneHandling} from "angular-element-variants";

export const variant = {
  name: 'angularStyled',
  applicationType: 'angular',
// ViewEncapsulation: 0 = Emulated | 1 = Native | 2 = None | 3 = ShadowDom
  encapsulation: ViewEncapsulation.None,
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
```

12. Add the following to you `main.ts` under `project/elements/src`: 
```typescript
...
// !!! CHANGE HERE !!!
import {getCompilerOptions} from 'angular-element-variants';
...
                                                            // !!! CHANGE HERE !!!
platformBrowserDynamic().bootstrapModule(AppModule, getCompilerOptions(variant))
  .catch(err => console.error(err));
```
13. Add the following to you `app.module.ts` under `project/elements/src/app`: 
```typescript
import {Injector, Type} from '@angular/core';
import {createCustomElement} from '@angular/elements';
import {variant} from '../variants/variant';
import {ElementSet, createCustomElements} from 'angular-element-variants';
...

export const angularElements: ElementSet<Type<any>> = {};


@NgModule({...})
export class ProviderAppModule {
  customElementComponent = angularElements;

  constructor(private injector: Injector) {
  }

  ngDoBootstrap(): void {
    createCustomElements(variant, angularElements, (componentClass: Type<any>) => createCustomElement<Type<any>>(componentClass, {injector: this.injector}));
  }
}
```

14. Add following lines to the scripts section in your `package.json` located in root level
```json
{
  ...
  "scripts": {
    ...
    "compile:tooling": "tsc -p tooling/tsconfig.tooling.json",
    "serve:elements:angular-styled": "npm run compile:tooling && ng serve --project elements -c=angularStyled",
    "build:elements:angular-styled": "npm run compile:tooling && ng build --project elements -c=angularStyled"
  },
  ...
}
```
13. Add the following to you `app.module.ts` under `project/demo-angular/src/app`: 
```typescript
import {setupGlobalCompilerOptions} from 'angular-element-variants';

@NgModule({...})
export class AppModule {
  
  constructor() {
    setupGlobalCompilerOptions({});
  }
  
}
```


### Setup for Lazy Loading of Elements
As we will need lazy loading so solve several problems in change detection and the injection tree we will setup lazy loading right now to have it solved front off.
To do so we need to setup both sides, the consumer and the provider.

#### Setup Consumer Application to Lazy Load Elements

1. `npm i -S @angular-extensions/elements`,
3. Create file `elements-loading.component.ts` in `projects/demo/src/app/angular-elements`.
4. Insert following content: 
```typescript
import {Component} from '@angular/core';

@Component({
  selector: 'elements-loading',
  template: `<div>Loading...</div>`
})
export class ElementsLoadingComponent {

}
```
5. Create file `elements-error.component.ts` in `projects/demo/src/app/angular-elements`.
6. Insert following content: 
```typescript
import {Component} from '@angular/core';

@Component({
  selector: 'elements-error',
  template: `<div>Error!</div>`
})
export class ElementsErrorComponent {

}
```
7. Create file `angular-elements.module.ts` in `projects/demo/src/app/angular-elements`.
8. Insert following content: 
```typescript
import {NgModule} from '@angular/core';
import {LazyElementModuleRootOptions, LazyElementsModule} from '@angular-extensions/elements';
import {ElementsLoadingComponent} from './elements-loading.component';
import {ElementsErrorComponent} from './elements-error.component';

const BASIC_ELEMENTS_URL = 'elements/main.js';
const lazyElementsOptions: LazyElementModuleRootOptions = {
  elementConfigs: [  ],
  rootOptions: {
    loadingComponent: ElementsLoadingComponent,
    errorComponent: ElementsErrorComponent
  }
};
@NgModule({
  declarations: [ElementsLoadingComponent, ElementsErrorComponent],
  imports: [
    LazyElementsModule.forRoot(lazyElementsOptions)
  ],
  exports: [
    LazyElementsModule
  ]
})
export class AngularElementsModule {
}
```
9. Add following lines in `projects/demo/src/app/app.module.ts`:
```typescript
...
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AngularElementsModule} from './angular-elements/angular-elements.module';

@NgModule({
  //  !!! CHANGES HERE !!! 
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  ...
  imports: [
    // ... !!! CHANGES HERE !!!
    FormsModule,
    AngularElementsModule
  ],
  ...
})
...
```

Your app is now ready to work with angular elements.
Now let's setup some content in `app.component.ts` to experiment.

10. Delete files in all `app.component.*` files in `projects/demo-angular/src/app` folder.
11. Create `app.component.ts` in `projects/demo-angular/src/app` folder and insert following content:
```typescript
import { Component } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
      Primitive: <input [(ngModel)]="primitive"><br/>
      <button (click)="changeValueImmutable()">trigger immutable change</button>

      <!-- WEB COMPONENT GETS INSERTED LATER ON HERE -->
  `
})
export class AppComponent {
  primitive = 42;
  o = {primitive: this.primitive};
  o$ = new BehaviorSubject(this.o);

  constructor() {
  }

  changeValueImmutable() {
    this.primitive = this.primitive + 1;
    this.o = {primitive: this.primitive};
    this.o$.next(this.o);
  }

  log(v) {
    console.log(v);
  }
}
```
Done with the consumer app. Now let's create a web component.

#### Setup Provider Application to Lazy Load Elements
To have some more real life examples we set-up not only a simple web component but also include components with third party libraries.

1. Delete all file in `projects/elements/src/app`.
2. Create `web.component.ts` into `projects/elements/src/app` folder and insert following content:
```typescript
import {Component, Input, Output} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  template: `
      <h1>WebComponent</h1>
      <p>@Input() value: {{value | json}}</p>
      <button (click)="update.next(value)">trigger output</button>
  `
})
export class WebComponent {
  @Input() value: string;
  @Output() update = new Subject();
}
```
7. Create `app.module.ts` in `projects/elements/src/app` folder and insert following content:
```typescript
import {Injector, NgModule, Type} from '@angular/core';
import {createCustomElement} from '@angular/elements';
import {createCustomElements, ElementSet} from 'angular-element-variants';
import {variant} from '../variants/variant';
import {WebComponent} from './web-component/web.component';

export const angularElements: ElementSet<Type<any>> = {
  'web-component': WebComponent,
};
export const DECLARATIONS = [
  WebComponent
];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [],
  entryComponents: [DECLARATIONS]
})
export class ProviderAppModule {
  customElementComponent = angularElements;

  constructor(private injector: Injector) {
  }

  ngDoBootstrap(): void {
    createCustomElements(variant, angularElements, (componentClass: Type<any>) => createCustomElement<Type<any>>(componentClass, {injector: this.injector}));
  }

}
```
8. Insert the following content `app.component.ts` in `projects/demo-angular/src/app` folder:
```typescript
    <!-- WEB COMPONENT GETS INSERTED LATER ON HERE -->
    <web-component *axLazyElement></web-component>
```
9. Add a new scripts entry to `package.json` in the root folder to use your new configuration.
```json
{
  ...
  "scripts": {
    ... !!! CHANGES HERE !!!
    "serve:all": "npm-run-all --parallel serve:demo-angular serve:elements:angular-styled"
   },
  ...
}
```
10. Test it and run
```shell script
npm run serve:all
```

### Setup for Angular Material

Now we setup Angular material. This third library not only serves javascript but also complex css animations as well as components.
It will give us a good foundations for style experiments and many more.

1. `ng add @angular/material --project demo`
   - Choose a prebuilt theme name, or "custom" for a custom theme: **Indigo/Pink**
   - Set up HammerJS for gesture recognition? **No**
   - Set up browser animations for Angular Material? **Yes**
2. Revert `angular.json`
3. Insert `@import "~@angular/material/prebuilt-themes/indigo-pink.css";` at the bottom of `projects/demo-angular/src/styles.scss`.
4. Create a folder `mat-web-component` in `projects/elements/drc/app`.
5. Create a file `mat-web-component-modules.ts` and insert following content:
```typescript
import {MatFormFieldModule, MatInputModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

export const MAT_WEB_COMPONENT_MODULES = [
 BrowserAnimationsModule,
 FormsModule,
 MatFormFieldModule,
 MatInputModule
];
```
4. Insert required modules and the class and tag name of the element in `app.module.ts` in `projects/elements/src/app` folder:
```typescript
... 
export const angularElements: any[] = [
  ... !!! CHANGE HERE !!! 
  [MatWebComponent, 'mat-web-component']
];
 @NgModule({
   ...
   imports: [
     ... !!! CHANGE HERE !!!
     MAT_WEB_COMPONENT_MODULES
   ],
   ...
 })
 export class AppModule implements DoBootstrap {
  ...
 }
```
5. Create `mat-web.component.ts` in `projects/elements/src/app/mat-web-component` folder and insert following content:
```typescript
import {ChangeDetectionStrategy, Component, Input, Output} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  template: `
      <h1>MatWebComponent</h1>
      <p>@Input() value: {{value | json}}</p>
      <br/>
      <mat-form-field>
          <input matInput
                 placeholder="Favorite food"
                 [value]="value"
                 (input)="event.next($event)">
      </mat-form-field>
  `
})
export class MatWebComponent {
  @Input() value: string;
  @Output() event = new Subject();
}
```  

### Setup for Angular Dynamic Forms 

In this section we setup another third party library for dynamic form generation.
The library itself reuses material and also adds other logic. 

Interesting here we don't know how change detection is handled internally.  

1. `npm i @ng-dynamic-forms/core -S`
2. `npm i @ng-dynamic-forms/ui-material -S`
3. `npm i angular2-text-mask -S
4. Create a folder `dynamic-form-component` in `projects/elements/drc/app`.
5. Create a file `dynamic-form-component-modules.ts` and insert following content:
```typescript
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule, MatNativeDateModule} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {DynamicFormsMaterialUIModule} from '@ng-dynamic-forms/ui-material';

export const DYNAMIC_FORM_COMPONENT_MODULES = [
  BrowserAnimationsModule,
  ReactiveFormsModule,
  DynamicFormsMaterialUIModule,
  MatNativeDateModule,
  MatCardModule
];
```

4. Insert required modules in `app.module.ts` in `projects/elements/src/app` folder:
```typescript
...
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DynamicFormsMaterialUIModule} from "@ng-dynamic-forms/ui-material";
import {MatNativeDateModule} from "@angular/material";
 ...

export const angularElements: any[] = [
  ... !!! CHANGE HERE !!!
  [DynamicFormWebComponent, 'dynamic-form-web-component']
];

 @NgModule({
   ...
   imports: [
     ... !!! CHANGE HERE !!!
     DYNAMIC_FORM_WEB_COMPONENT_MODULES
   ],
   ...
 })
 export class AppModule implements DoBootstrap {
  ...
 }
```
5. Create `dynamic-form-web.component.ts` in `projects/elements/src/app/dynamic-form-component` folder and insert following content:

```typescript
import {ChangeDetectionStrategy, Component, Input, Output} from '@angular/core';
import {Subject} from 'rxjs';
import {DynamicFormService} from "@ng-dynamic-forms/core";

@Component({
  template: `
      <h1>DynamicFormWebComponent</h1>
      <form [formGroup]="formGroup">
          <dynamic-material-form
                  [group]="formGroup" [model]="_formModel"
                  (change)="change.next($event)">
          </dynamic-material-form>
      </form>
  `,
  // @NOTICE Change to .OnPush only works with reactive architecture atm
  changeDetection: ChangeDetectionStrategy.Default
})
export class DynamicFormWebComponent {
  formGroup = this.formService.createFormGroup([]);

  _formModel = [];
  @Input() set formModel(fM) {
    this._formModel = this.formService.fromJSON(fM);
    this.formGroup = this.formService.createFormGroup(this._formModel);
  };

  @Output() change = new Subject();

  constructor(private formService: DynamicFormService) {

  }
}
```  

## ZoneHandling and Angular Elements

There are 2 way how to manage change detection in angular components:
1. Zone-less (change detection needs to be managed manually)
2. Zone-full (change detection is managed by `zone.js` in 2 possible flavors)

In the following I summarized different approaches and their pros and cons:

### Zone-less

This approach can be used inside an non-angular as well as angular.
With some changes in the code we replace `NgZone` instance with `'noop'`.

Changes then have to be managed manually. Especially in a non angular project 
this approach is good because won't `zone.js` monkey-patch a lot of global/window APIs.

**Pro:**  
No Window API will be patched, and the bundle size is smaller (zone.js will be ~12k).  

**Con:**  
User need to take care of Change Detection, and existing Angular Component can't be exported as Angular Element without changes.

To test this and run a angular project zone-less following steps should be made:
1. Open `projscts/elements/src/variants/` of your **provider project** and set `zone` to `ZoneHandling.None`
2. Test it by importing `NgZone` into `variant.angularStyled.ts` and log the instance:
```txpescript
 constructor(private ngZone: NgZone) {
    console.log('ngZone', this.ngZone);
 }
```
You should see `NoopNgZone` as class name. 

That's it. Now we run zone-less. :)

#### Problems with Components when Running Zone Less

Next to some edge cases with zones and web components it works change detection pretty seamless in angular.
However, when exiting zone and approaching a fully reactive zone-less setup we run into several scenarios that end up problematic.

Let's see what scenarios we should take a closer look:     
- Template bindings 
- Input/Output bindings
- Logic triggered internally
- DOM Events
- Internal Logic

##### Template Bindings

If we test some basic template bindings, displaying a primitive or a simple object, we see no changes in the view.
```html
p: {{primitive}}, o: {{o | json}} 
``

Also with the `async` pipe nothing gets rendered. 
This is the case because the async pipe only triggers `ChangeDetectorRef.markForCheck()`, 
but change detection does not look for changes, as it is disabled. 

```html
p$: {{primitive$ | async}}, o$: {{o$ | async | json}} 
```

To solve it we need to trigger `ChangeDetectorRef.detectChanges()` whenever we want to render.

One of the first approaches would be to implement a `tap` operator and trigger cd there before it is rendered in the view. 
But this would end up in a off by one issue and therefore is no solution.

A proper solution is trigger `detectChanges()` over a pipe,
so rendering runs after the value arrives in the template.

**Primitive Workaround**
To achieve it in a quick an dirty way is following:
1. Create a file called `push.pipe.ts` into your projects `src` folder.
2. Copy the source file for the `async` pipe from the angular repo. Here the link to the file [async_pipe.ts](https://github.com/angular/angular/blob/ab29874f09463e634b6aa8ec61fb1f607e108e2f/packages/common/src/pipes/async_pipe.ts). 
3. Replace [following line](https://github.com/angular/angular/blob/ab29874f09463e634b6aa8ec61fb1f607e108e2f/packages/common/src/pipes/async_pipe.ts#L144) with this snippet:
```typescript
 this._ref.detectChanges();
```
4. Replace [following line](https://github.com/angular/angular/blob/ab29874f09463e634b6aa8ec61fb1f607e108e2f/packages/common/src/pipes/async_pipe.ts#L71-L72) with this snippet:
```typescript
 @Pipe({name: 'push', pure: false})
 export class PushPipe implements OnDestroy, PipeTransform {
```
5. Add it to you `app.module.ts` declarations: 
```typescript
...
import {PushPipe} from "./push.pipe";

@NgModule({
  declarations: [
    ...
    PushPipe
  ],
  ...
})
export class AppModule {
  ...
}
```
6. Use it like this: `{{observable$ | push}}`

**Needs**
We refactor async pipe to fulfill strict and consistent undefined handling as described in [Input Bindings](Input-Bindings).
Also the mentioned call of `detectChanges()` needs to be done inside. 
Optional we could schedule side effects over `requestAnimationFrame`.

##### Input Bindings

Input Bindings don't fire after the initial render. 
The code below shows a setup where we can test this.
```typescript
...

@Component({
  selector: 'minimal',
  template: `
      <p>@Input() value: {{value$ | async}}</p>
  `
})
export class MinimalComponent {
  value$ = new ReplaySubject<string>(1);
  @Input() set value(v: string) {
    console.log('setter fired with:', v);
    this.value$.next(v);
  };
}
```

The setter for the `value` property is only called once, no matter how often we change the input value.
Also a switch to `ChangeDetectionStrategy.OnPush` behaves in the same way.

The solution is to use the above explained push pipe to trigger change detection after the value arrived an the input binding:
```html
  <minimal
    [value]="observable$ | push">
  </minimal>
```

##### Output Bindings

Output Bindings fire even without zone.js. 
Below you see the sample:
```typescript
@Component({
  selector: 'minimal',
  template: `
      <button (click)="update$.next($event)">trigger output</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MinimalComponent {
  update$ = new Subject();
  @Output() update = this.update$;
}
```
This means the function is fired in the parent. You can process it but if you want to render the value you again have to use the `push` pipe:
```typescript
@Component({
  selector: 'app-root',
  template: `
      <code>{{update$ | push}}</code>
      <minimal
              (update)="log($event)">
      </minimal>
  `
})
export class AppComponent {
  update$ = new Subject();

  log(v) {
    console.log('processing possible with:', v);
    this.update$.next(v.clientY);
  }
}

```

##### Dom Events

Similar to output bindings dom events work without zone.js. 
In the following example we see that the DOM event get's processed in `setFocus`.
```typescript
@Component({
  ...
  template: `
      <input
              (focus)="setFocus(true)"
              (blur)="setFocus(false)">
  `
  ...
})
export class MinimalComponent {
  focus = false;
  setFocus($event) {
    console.log('setFocus triggered', $event);
    this.focus = $event;
  }
}
```

If we want to render it we solve it in the same way as we did with output bindings. 
We simple use the `push` pipe.
```typescript
@Component({
  ...,
  template: `
      focus: {{focused | push}}
      <input
              (focus)="setFocus(true)"
              (blur)="setFocus(false)">
  `,
 ...
})
export class MinimalComponent {
  focused = new BehaviorSubject<boolean>(false);

  setFocus($event) {
    this.focused.next($event);
  }
}
```

Another thing we could do is forward the state directly as output binding. 
Here we already know we dont need to care about change detection.

```typescript
@Component({
  ...,
  template: `
      {{focused | async}}
      <input
          (focus)="focused.next(true)"
          (blur)="focused.next(false)">
  `,
 ...
})
export class MinimalComponent {
  @Output() focused = new BehaviorSubject<boolean>(false);
}
```
Now the parent has to take care about chane detection and we are out of the game ;).
We can even use the async pipe because if change detection get's triggered from parent it will update.

##### Animations

Animations in general work fine. They only need to be triggered.
When we process any value coming from input bindings everything animates properly.
As mentioned before values from input bindings are our **save path**.

Here a example opening/closing a box over height transition:
```typescript
@Component({
  selector: 'app-open-close',
  animations: [
    trigger('openClose', [
      state('open', style({height: '200px'})),
      state('closed', style({height: '100px'})),
      transition('open => closed', [animate('1s')]),
      transition('closed => open', [animate('0.5s')]),
    ]),
  ],
  template: `
      <div [@openClose]="isOpen ? 'open' : 'closed'" class="open-close-container">
          <p>The box is now {{ _isOpen ? 'Open' : 'Closed' }}!</p>
      </div>
  `,
  styles: [`
      .open-close-container {
          background-color: green;
      }
  `]
})
export class OpenCloseComponent {
  @Input() isOpen: boolean;
}
```
As you can see to trigger the animation we use normal template bindings `[@openClose]="_isOpen ? 'open' : 'closed'"`, 
no `push` pipe needed.

If we want to trigger the animation on click without values over input bindings is stops working: 

```typescript
...
@Component({
  selector: 'app-open-close',
  animations: [...],
  template: `
      <div (click)="toggle()" [@openClose]="isOpen ? 'open' : 'closed'" class="open-close-container">
          <p>The box is now {{ isOpen ? 'Open' : 'Closed' }}!</p>
      </div>
  `,
  styles: [...]
})
export class OpenCloseComponent {

  isOpen: boolean = true;

  toggle() {
    this.isOpen = !this.isOpen;
  }

}
```

Here we need to introduce some changes. 
We could use the `push` pipe or trigger change detection based on dom events.

With the `push` pipe it looks like this:
```typescript
...
@Component({
  ...
  template: `
    <div (click)="toggle()" [@openClose]="(isOpen$ | push$) ? 'open' : 'closed'" class="open-close-container">
        <p>The box is now {{ (isOpen$ | push$) ? 'Open' : 'Closed' }}!</p>
    </div>
  `,
  ...
})
export class OpenCloseComponent {

    isOpen$$ = new BehaviorSubject<any>('');
    isOpen$ = this.isOpen$$
      .pipe(scan(acc => !acc, false));
    
    toggle() {
      this.isOpen$$.next('');
    }

}
```

The approach with events depends on the given situation. 
In best case we have access to the component and can implement a call of `.detectChanges()` if needed:

```typescript
...
@Component({
  ...
  template: `
      <div (click)="toggle()" [@openClose]="isOpen ? 'open' : 'closed'" class="open-close-container">
          <p>The box is now {{ isOpen ? 'Open' : 'Closed' }}!</p>
      </div>
  `,
  ...
})
export class OpenCloseComponent {

  isOpen: boolean = true;
  toggle() {
    this.isOpen = !this.isOpen;
    this.cd.detectChanges();
  }

  constructor(private cd: ChangeDetectorRef) {
  }

}
```

If this is not possible, think about third party components or directives, we need to go another path.

As the animation is triggered over a click event we can apply a event binding for the same event 
to our component from the parent view and trigger change detection from there. 

```typescript
@Component({
  selector: 'app-root',
  template: `
      <app-open-close (click)="cd.detectChanges()"></app-open-close>
  `
})
export class AppComponent {

  constructor(private ngZone: NgZone, private cd: ChangeDetectorRef) {
    console.log('ngZone', this.ngZone);
  }

}
```

To things are worth to mention here. 
First we can imaging when we have many different events that trigger animations (or other internal processes)
we end up in a very long and bulky snippet. 

Second this workaround is not working for all cases. Imagine a focus event would be a trigger.
This would simply not work with the above solution.
 
**Needs:**
Abstract change detection triggering of multiple events into a directive. 
The component can stay free from any additional imports or logic.

##### Internal Logic

We can run any kind of logic internally and don't have to think about `zone.js`. 
Communicate with services, other parts of the component. Only if we want to render
something to the view we have to consider change detection. 

As we already know how to use observables we put the data to render in a stream and use the `push` pipe to trigger rendering.
This is exactly the same thing we nearly always did so far.

Let's look at a simple examples where we render the actual time to the view:
```typescript
@Component({
  ...,
  template: `{{time$ | push}}`,
 ...
})
export class MinimalComponent {
  time$ = new interval(1000)
    .pipe(map(_ => {
              const d = new Date();
              return d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
            }));
}
```

That easy. :)

#### Problems with WebComponents when Running Zone Less

WebComponent Template bindings, output bindings, internal logic, dom events 
as well as animations behave in the same way as they do for normal Angular components.
 
**The Difference:**
Input bindings however, behave a bit different. We see no values entering until we trigger change detection. 
But this is not a big deal as we are already used to use the `push` pipe.  

If we use it for input bindings it works: `<web-component [value]="observable$ | push"><web-component>`

### Zone-full  

Used inside an angular where `zone.js` is already loaded.
This means we can turn basically any angular component into a web-component we no effort.

Unfortunately there are some problems at the moment where we need to work around. 
As we have multiple zone instances some issues occur,
especially in async processes as timeouts, animations promises.

**Pro:**   
User can develop Angular Element just like they develop normal Angular Component, 
and user can easily expose a lot of existing Angular Component to Angular Element.  

**Con:**  
In this case, there is a limitation that the Angular Element need to run in a Angular App Host.  
We need to implement one of the following workarounds:
- Parent-Zone Hack (Reuse parent zone in web-component `compilerOptions`)
- Context-Aware-Zones Hack (Patch and restore APIs depending on component borders)

#### Parent-Zone Hack

The here is to pass the zone instance from the parent or consumer app in this document called **demo** too the provider app in this document called **elements**.
There the bootstrap mechanism of the provider side will take over the zone instance from the consumer application and replaces it's own instance.

As we want to be flexible we setup a mechanism that handles different scenarios.

Here we cover following:
- **Consumed by Angular** - We pass the paren zone to the elements and have change detection in the web component working properly with angular. (`this.ngZone`)
  NOTE: If the consumer app has zone disables it automatically passes `NoopNgZone`
- **Consumed by running Zone-Less** - We pass 'noop' as string and therefore have to manage change detection in the web component on our own. (`'noop'`) 
- **Stand Alone** - We pass nothing and let the web component use the original zone instance from the elements project. (`undefined`)

Let's implement the mechanism

1. Insert following code into `demo-angular.module.ts` located in `projects/demo-angular/src/app/angular-elements`: 
```typescript
export class DemoAngularModule {
  ... 

  constructor(private ngZone: NgZone) {
    // Options are: this.ngZone, 'noop', undefined
    (window as any).ngZone = this.ngZone;
  }
}
```
2. Insert following code into `main.ts` located in `projects/elemets/src`: 
```typescript
platformBrowserDynamic()
//                          !!! CHANGE HERE !!!
.bootstrapModule(AppModule, getCompilerOptions())
  .catch(err => console.error(err));

// !!! CHANGE HERE !!!
function getCompilerOptions() {
  const ngZone = (window as any).ngZone;
  if (ngZone) {
    return  {ngZone};
  }
  return {};
}
```

#### Context-Aware-Zones-Zones
@TODO

#### ViewEncapsulation and Styling

In the next few sections we will quickly discuss the different ViewEncapsulation options.
But be aware we can control everything over our `variants.ts` over the `encapsulation` key. 

### View Encapsulation with Option `None`
When can set `encapsulation` of our component to `ViewEncapsulation.None` like this: 
```typescript
@Component({
  ... !!! CHANGES HERE !!!
  encapsulation: ViewEncapsulation.None
})
export class WebComponent {
    ...
}
```
Here we can override the styles of a web component by just adding styles to our `styles.css`.

As we can see in the demo app when running `npm run start` the headlines of the components are green. 
This style rule is placed in our `projects/styles.css` file.

### View Encapsulation with Option `ShadowDom`
When using `ViewEncapsulation.ShadowDom` we seal the components styles by using the [Shadow DOM](https://w3c.github.io/webcomponents/spec/shadow/).
```typescript
@Component({
  ... !!! CHANGES HERE !!!
  encapsulation: ViewEncapsulation.ShadowDom
})
export class WebComponent {
    ...
}
```

By definition of the shadow dom now we can't override styling of our web-components.
We test it by checking if we the headlines of the different web components are NOT green anymore.

### View Encapsulation with Option `Emulated`

When using `ViewEncapsulation.Emulated` is the default setting and emulates the behavior of shadow DOM by applying styles over attributes.

```typescript
@Component({
  ... !!! CHANGES HERE !!!
  encapsulation: ViewEncapsulation.Emulated
})
export class WebComponent {
    ...
}
```
Here, same as with `ViewEncapsulation.ShadowDom` we can't override styling of our web-components. The differences is that we can't override outside of the components styling

## Loading Strategies

There are different loading strategies. Some of them are not only convenient but also help to solve problems in change detection.   
In this document we discuss following strategies:
- [x] bundled within the app
- [x] lazy loaded pre compiled
- [x] lazy loaded un-compiled 

Let's first clarify what `pre-compiled` and `un-compiled` means. 

Let's quickly clarify wording. When we speak about **pre-compiled** elements we speak about a bundle that includes the creation of the elements.
To be more specific we speak about a bundle that includes the call to 
```typescript
const element = createCustomElement(componentClass, {injector: this.injector});
customElements.define(selector, element);
```

If this is done in the consumer bundle we speak about **un-compiled** elements.
Maybe the wording is not perfect, but huh.. we have to start somewhere. ;)

So when we speak about `pre-compiled` Angular elements we mean that the call to `createCustomElement` is done in the provider bundle:
```typescript
...
@NgModule({
  declarations: [ELEMENTS],
  ...
  entryComponents: [ELEMENTS]
})
export class ProviderAppModule implements DoBootstrap {

  constructor(private injector: Injector) {
  
  }

  ngDoBootstrap(): void {
      const element = createCustomElement(MyComponent, {injector: this.injector});
      customElements.define('my-component', element);
  }

}
```

The element gets loaded from the consumer, the JavaScript executes and the elements can be used. 
This is a go to approach for stand-alone components and also works seamless within an Angular application.

When we speak about `un-compiled` Angular elements we mean that the call to `createCustomElement` is done in the consumer bundle:

```typescript
...
@NgModule({
})
export class ConsumerAppModule implements DoBootstrap {

  constructor(private injector: Injector) {
  
}

  ngDoBootstrap(): void {
      const element = createCustomElement(MyComponent, {injector: this.injector});
      customElements.define('my-component', element);
  }

}
```
### Elements Pre-compiled Eager Loaded

The eager loaded strategy is already included and described in the section setup. 

### Elements Pre-compiled Lazy Loaded

The lazy loaded strategy is already included and described in the section setup. 
It's performs way better than the bundled strategy and also brings points for the first meaningful pain 
as the elements are loaded only if they are needed.

### Setup Elements Un-compiled Lazy Loaded

1. `npm i -S @juristr/ngx-lazy-el`,
2. Create folder `lazy-el` in `projects/demo/src/app`.
3. Create file `lazy-el.module.ts` in `projects/demo/src/app/lazy-el`.
4. Insert following content: 
```typescript
import {NgModule, NgModuleFactoryLoader, SystemJsNgModuleLoader} from '@angular/core';
import {fakeMatcher, NgxLazyElModule} from '@juristr/ngx-lazy-el';

export const lazyConfig = [
  {
    selector: 'web-component',
    matcher: fakeMatcher,
    loadChildren: () => import('../../../../elements/src/app/app.module')
      .then(m => m.AppModule)
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
```
5. Add following lines in `projects/demo/src/app/app.module.ts`:
```typescript
...
import {LazyElModule} from './lazy-el/lazy-el.module';

@NgModule({
  ...
  imports: [
    // ... !!! CHANGES HERE !!!
    LazyElModule
  ],
  ...
})
...
```

Your app is now ready to work with angular elements.
Now let's setup some content in `app.component.ts` to experiment.

7. Open your `app.component.ts` in `projects/demo/src/app` folder and insert following content:
```typescript
...
@Component({
  ...,
  template: `
     ...
     <web-component *ngxLazyEl></web-component>
  `
})
...
```
Done with the consumer app. Now let's setup the provider app.

#### Setup Provider Application for Un-Compiled Loading

As we did before we try to solve as much as possible over configuration. So let's implement another flag in our environment files.

1. Adopt the following code in `app.module.ts` in `projects/elements/src/app` folder:
```typescript
...
export class AppModule {
  // !!! CHANGES HERE !!!
  customElementComponent = angularElements;
}
...
```

Now the LazyEl Service can find our provided components.
Try to run the application.

After having both of them working let's compare them:

Where the pre-compiled approach is a state of the art way to bundle and serve web components the un-compiled lazy loading approach I'm more an exot.

The reason that web components are created in addition to lazy load components is because of their usage im the template.
We can just place the tag there and don't have to care about creating and registering the component. 

The rest, is exactly the same as with normal components. Also the injector tree is the one from the consumer app.
This means that for example the `BrowserAnimationsModule` that is needed for our web-component needs to be placed in the consumer app now instead of the provider app.
Another reason why it is better to also maintain this kind of loaded components in the consumer app and not a a separate project. 

**Un-compiled Lazy Loading Overview**   

**Pros**   
- Easyer than creating just dynamic components (just use tag name that's it)
- On demand loading
- Shared injection scope with consumer (therefore also same zone)   

**Cons**   
 - Components can be developed and depolyed separately
 - Bundling has to happen at build time
 - No sealed environment. Interference with consumer apps injection scope 
   This means we have to maintain dependencies on consumer and provider und side.
    
 
## Productivity Helpers
- [x] Push Pipe
- [x] Let Directive
- [x] CdOn Directive

### Push Pipe

An Angular pipe similar to the `async` pipe but triggers `detectChanges` instead of `markForCheck`.
This is required to run zone-less. We render on every pushed message.
(currently, there is an [isssue](https://github.com/angular/angular/issues/31438) with the `ChangeDetectorRef` in ivy so we have to wait for the fix.

The pipe should work as template binding `{{thing$ | push}}` 
as well as input binding `[color]="thing$ | push"` and trigger the changes of the host component.

```html
<div *ngIf="(thing$ | push) as thing">
  color: {{thing.color}}
  shape: {{thing.shape}}
<div>

<app-color [color]="(thing$ | push).color">
</app-color>
```

**Included Features:**
- subscription handling overview  life cycle
- a unified way of handling null and undefined with streams
- optional flag to turn off scheduling over `AnimationFrameScheduler` (on by default)
- change detection is done manually which allows it to work zone-less too

### Let Structural Directive

The `*let` directive serves a convenient way of binding multiple observables in the same view context.
It also helps with several default processing under the hood.

The current way of handling subscriptions in the view looks like that:

```html
<ng-container *ngIf="observable1$ | async as c">
  <app-color [color]="c.color" [shape]="c.shape" [name]="c.name">
  </app-color>  
</ng-container>
```

The `*let` directive take over several things and makes it more convenient and save to work with streams in the template
`*let="{o: o$, t: t$} as s;"` 

```html
<!-- observables = { color: observable1$, shape: observable2$, name:  observable3$ } -->

<ng-container *let="observable as c">
  <app-color [color]="c.color" [shape]="c.shape" [name]="c.name">
  </app-color>
</ng-container>

<ng-container *let="observable; let c">
  <app-color [color]="c.color" [shape]="c.shape" [name]="c.name">
  </app-color>
</ng-container>

<ng-container *let="observable; color as c; shape as s; name as n">
  <app-color [color]="c" [shape]="s" [name]="n">
  </app-color>
</ng-container>
```

**Included Features:**
- binding is always present. (`*ngIf="{}"` normally effects it)
- it takes away the multiple usages of the `async` pipe 
- propper handling of null and undefined values
- removes state slices if bound observable completes or errors
- an option to disable scheduling over `AnimationFrameScheduler` (on by default)
- control change detection and therefore can run zone-less

### CdOn Directive
The `cdOn` directive serves a convenient way of triggering change detection for multiple events.
It is **only used to solve edge cases in zone-less applications**,
by taking away bulky templates and externalizing `ChangeDetectionRef` handling.

The current way of workaround looks like that:

```html
<my-component 
    (click)="cd.detectChanges()"
    (focus)="cd.detectChanges()"
    (blur)="cd.detectChanges()"
    (input)="cd.detectChanges()">
</my-component>
```

The `cdOn` directive take over the multiple bindings and reduce them to a single input binding.
`[cdOn]="['eventName']"`. Also the import of ChangeDetectionRef can be deleted now.

```html
<my-component 
    [cdOn]="['click','focus','blur','input']">
</my-component>
```

**Included Features:**
- reduce template code 
- manage multiple events
- manage multiple outputBindings
- controls change detection for provided events
- optional change detection is triggered over `AnimationFrameScheduler`

## Browser Support and Backwards Compatibility

@TODO


## Performance

### Bundling

### Unoptimized build like `ng serve`:

```typescript
"build": {
  "builder": "ngx-build-plus:browser",
  "options": {
    "outputPath": "dist/elements",
    "index": "projects/elements/src/index.html",
    "main": "projects/elements/src/main.ts",
    "polyfills": "projects/elements/src/polyfills.ts",
    "tsConfig": "projects/elements/tsconfig.app.json",
    "aot": false,
    "assets": [],
    "styles": [
      "projects/elements/src/styles.scss"
    ],
    "scripts": []
}
```


---

Default optimisations possible with Angular cil out of the box:

```typescript
"prodStandAlone": {
    "outputPath": "dist/elements-stand-alone",
    "fileReplacements": [
    {
      "replace": "projects/elements/src/environments/environment.ts",
      "with": "projects/elements/src/environments/environment.prodStandAlone.ts"
    }
    ],
    "optimization": true,
    "sourceMap": false,
    "namedChunks": false,
    "aot": true,
    "extractLicenses": true,
    "vendorChunk": false,
    "buildOptimizer": true
}
```

**Webpack Bundle Analyzer:**
main-es2015.js (1.02 MB)
polyfills-es2015.js (36.4 KB)
styles-es2015.js (3.01 KB)
runtime-es2015.js (1.45 KB)

`@angular/material`, here is uncompressed nearly the same size as `@angular/core`:

@angular/material (1.27M)

---

If we ignore the `styles-es2015.js` as we wont ship it we are down to 2 bundles with the following size: 

**Webpack Bundle Analyzer:**
main-es2015.js (1.02 MB)
polyfills-es2015.js (37.23 KB)

If we ship zone-less  `palyfill-es2015.js` goes down to the following size: 

**Webpack Bundle Analyzer:**
polyfills-es2015.js (37.23 KB)

---
By excluding `zone.js` from `polyfills-es2015.js`  (We will any way inject it from the parent) we are down to the following size:

**Webpack Bundle Analyzer:**
polyfills-es2015.js (976 B)





# Angular Architect API

## Chunk Sets

A list of chunk sets in the right order

 **Polyfills**
- polyfills-es5

  _Includes:_ 
  - es5-polyfills.js
  - zone.js/dist/zone-legacy
  - polyfills.ts  
    
  _Output:_
  - polyfills-es5-es2015.js
  - polyfills-es5-es2015.js.map
   
   
 - polyfills

    _Includes:_
    - polyfills.ts
    
    _Output:_
    - polyfills-es2015.js
    - polyfills-es2015.js.map

**Global Styles**
 - styles
 
    _Includes:_ 
    - styles.css  
    
    _Output:_
    - styles-es2015.js
    - styles-es2015.js.map

 - stylesEs5
    
    _Includes:_ 
    -  styles.css
  
    _Output:_
    - styles-es5.js
    - styles-es5.js.map

**Scripts**
- scripts
    _Includes:_ 
    - all files in architect API under "scripts"
    
    _Output:_
    - scripts.js
    
**Framework and Application**
- main  
    _Includes:_
    - main.ts  
    
    _Output:_
    - main-es2015.js
    - main-es2015.js.map 
   
 - runtime  
    _Includes:_  
    - runtime.ts
    
    _Output:_
    - runtime-es2015.js
    - runtime-es2015.js.map

- vendor  

    _Includes:_
    - vendor.ts
    
    _Output:_
    - vendor-es2015.js
    - vendor-es2015.js.map

- mainEs5: 

    _Includes:_
    - main.ts

    _Output:_
    - main-es5.js
    - main-es2015.js.map
    
- runtimeEs5
 
    _Includes:_  
    - runtime.ts 
    
    _Output:_
    - runtime-es5.js
    - runtime-es2015.js.map

- vendorEs5

    _Includes:_
    - vendor.ts
    
    _Output:_
    - vendor-es5.js
    - vendor-es2015.js.map
