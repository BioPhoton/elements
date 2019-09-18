# Prove Of Concept for Angular elements and third party libs

In this PoC the goal is to wrap `@angular/material` components 
created over `@ng-dynamic-forms/core` and use it in another angular application.

Following things should be included:
- [x] **Setup and Build** (A detailed documentation on how to setup things)
- [x] **Working ChangeDetection** (ChangeDetection should work for all features. If possible zone-less)
- [x] **Developer Workflow** (A convenient developer workflow for serving and building)
- [x] **Loading strategies** (Loading of web components)
- [ ] **Productivity Helpers** (A general set of helpers for more convenience)    

## Project Setup and Build

### Version Information
Find here all packages and their versions listed.


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
@angular-extensions/elements      | 8.6.0
@angular/material                 | 8.2.0
@ng-dynamic-forms/core            | 9.0.1
@ng-dynamic-forms/ui-material     | 9.0.1
angular2-text-mask                | 9.0.0
npm-run-all                       | 4.1.5

### Setup for Angular elements

1. `ng new elements --create-application false`
2. `ng add application demo`
3. `ng add application elements`
4. `ng add @angular/elements --project elements`
5. `ng add ngx-build-plus --project elements`
6. Create new file in root named `proxy.conf.json` and insert following content 
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
7. Add `proxy.config.json` to `angular.json` under demo projects serve options in `angular.json`:
```json
{
  ...
  "projects": {
    ...
    "demo": {
      ...
      "architect": {
        ...
        "serve": {
           ...
           "options": {
              ... !!! CHANGE HERE !!!
              "proxyConfig": "proxy.conf.json"
            },
          ...
        },  
        ...
      },
      ...   
    },
    ...
  },
  ...
}
```
8. `npm i -D npm-run-all`
9. Add following lines to the scripts section in your `package.json` located in root level
```json
{
  ...
  "scripts": {
    ...
    "start": "npm-run-all --parallel serve:*",
    "serve:demo": "ng serve -o --project demo",
    "serve:element": "ng serve --project elements --single-bundle --port 4300"
  },
  ...
}
```

### Setup for lazy loading elements

1. `npm i -S @angular-extensions/elements`
2. Delete files `projects/demo/src/app` folder
3. Create `app.component.ts` into `projects/demo/src/app` folder and insert following content:
```typescript
import { Component } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
      Primitive: <input [(ngModel)]="primitive"><br/>
      <button (click)="changeValueImmutable()">trigger immutable change</button>

      <ng-template #loading>Loading...</ng-template>
      <ng-template #error>Error!</ng-template>

      <!-- Replace [value]="primitive" with [value]="o" to use an object instead of primitive value-->
      <web-component
              *axLazyElement="'elements/main.js'; loadingTemplate: loading; errorTemplate: error"
              [value]="primitive" (update)="log($event)">
      </web-component>
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

4. Create `app.module.ts` into `projects/demo/src/app` folder and insert following content:
```typescript
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import {LazyElementsModule} from '@angular-extensions/elements';

@NgModule({
  declarations: [
    AppComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    FormsModule,
    LazyElementsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
5. Delete files `projects/demo/src/app` folder
6. Create `web.component.ts` into `projects/elements/src/app` folder and insert following content:
```typescript
import {ChangeDetectionStrategy, Component, Input, Output} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  template: `
      <h1>WebComponent</h1>
      <p>@Input() value: {{value | json}}</p>
        <button (click)="update.next(value)">trigger output</button>
  `,
  // @NOTICE Change to .OnPush only works with reactive architecture atm
  changeDetection: ChangeDetectionStrategy.Default
})
export class WebComponent {
  @Input() value: string;
  @Output() update = new Subject();
}
```
7. Create `app.module.ts` in `projects/elements/src/app` folder and insert following content:
```typescript
import {BrowserModule} from '@angular/platform-browser';
import {ApplicationRef, DoBootstrap, Injector, NgModule} from '@angular/core';
import {createCustomElement} from '@angular/elements';
import {WebComponent} from './web.component';

export const ANGUlAR_ELEMENTS: any[] = [
  [WebComponent, 'web-component']
];
export const DECLARATIONS = ANGUlAR_ELEMENTS.map(a => a[0]);

@NgModule({
  declarations: [DECLARATIONS],
  imports: [BrowserModule],
  entryComponents: [DECLARATIONS]
})
export class AppModule implements DoBootstrap {

  constructor(private injector: Injector) {

  }

  ngDoBootstrap(appRef: ApplicationRef): void {
    ANGUlAR_ELEMENTS.forEach(([componentClass, selector]) => {
      const element = createCustomElement(componentClass, {injector: this.injector});
      customElements.define(selector, element);
    });
  }

}
```
8. `npm start`

### Setup for Angular material

1. `ng add @angular/material --project demo`
   - Choose a prebuilt theme name, or "custom" for a custom theme: **Indigo/Pink**
   - Set up HammerJS for gesture recognition? **No**
   - Set up browser animations for Angular Material? **Yes**
2. Revert `angular.json`
3. Insert `@import "~@angular/material/prebuilt-themes/indigo-pink.css";` at the bottom of `projects/demo/src/styles.scss`.
4. Insert required modules and the class and tag name of the element in `app.module.ts` in `projects/elements/src/app` folder:
```typescript
...
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatInputModule} from "@angular/material";
 
... 
export const ANGUlAR_ELEMENTS: any[] = [
  ... !!! CHANGE HERE !!! 
  [MatWebComponent, 'mat-web-component']
];
 @NgModule({
   ...
   imports: [
     ... !!! CHANGE HERE !!!
     BrowserAnimationsModule,
     MatInputModule
   ],
   ...
 })
 export class AppModule implements DoBootstrap {
  ...
 }
```
5. Create `mat-web.component.ts` in `projects/elements/src/app` folder and insert following content:
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
  `,
  // @NOTICE Change to .OnPush only works with reactive architecture atm
  changeDetection: ChangeDetectionStrategy.Default
})
export class MatWebComponent {
  @Input() value: string;
  @Output() event = new Subject();
}
```  

### Setup for Angular Dynamic Forms 

1. `npm i @ng-dynamic-forms/core -S`
2. `npm i @ng-dynamic-forms/ui-material -S`
3. `npm i angular2-text-mask -S
`
4. Insert required modules in `app.module.ts` in `projects/elements/src/app` folder:
```typescript
...
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DynamicFormsMaterialUIModule} from "@ng-dynamic-forms/ui-material";
import {MatNativeDateModule} from "@angular/material";
 ...

export const ANGUlAR_ELEMENTS: any[] = [
  ... !!! CHANGE HERE !!!
  [DynamicFormWebComponent, 'dynamic-form-web-component']
];

 @NgModule({
   ...
   imports: [
     ... !!! CHANGE HERE !!!
     BrowserAnimationsModule,
     ReactiveFormsModule,
     DynamicFormsMaterialUIModule,
     MatNativeDateModule
   ],
   ...
 })
 export class AppModule implements DoBootstrap {
  ...
 }
```
5. Create `dynamic-form-web.component.ts` in `projects/elements/src/app` folder and insert following content:

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

## Working ChangeDetection

There are 2 way how to manage change detection in angular components:
1. Zone-less (change detection needs to be managed manually)
2. Zone-full (change detection is managed over by `zone.js`)

In the following I summarized different approaches and their pros and cons:

### Zone-less

This approach can be used inside an non-angular as well as angular.
With some changes in the code we replace `NgZone` instance with `'noop'`.

Changes then have to be managed manually. Especialy in a non angular project 
this approach is good because won't `zone.js` monkey-patch a lot of global/window APIs.

**Pro:**  
No Window API will be patched, and the bundle size is smaller (zone.js will be ~12k).  

**Con:**  
User need to take care of Change Detection, and existing Angular Component can't be exported as Angular Element without changes.

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
- Restoreable-Zones Hack (Patch and restore APIs depending on component borders)

#### Parent-Zone Hack
Passing the zone instance from the parent app too the web-component.
Here we could pass:
- `this.ngZone` the paren zone and have everything working automatically
- `'noop'` pass 'noop' and manage change detection on our own 
- `undefined` or don't set anything to take the original zone instance from the web component (including the current bug)
  
1. Insert following code into `app.module.ts` located in `projects/demo/src/app`: 
```typescript
export class AppModule {
  ... 

  constructor(private ngZone: NgZone) {
    // possible values are this.ngZone, 'noop', undefined
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
  let compilerOptions = {};
  if (ngZone) {
    compilerOptions = {ngZone};
  }
  console.log('getCompilerOptions', compilerOptions);
  return compilerOptions
}
```
### Restoreable-Zones
@TODO

## Developer Workflow

### Development

After following the setup from above we only need `npm start` to run both: 
- Serving the element (we serve the element with the --singleBundle flag enables)
- And serving the application (we use default cli commands)

Over a proxy config we redirect requests for the elements to the first served angular project.
In ths way we can work on both project in parallel and don't break any running serve or break other build processes.

As the bundle is now independent from the main app and we lazy loading the bundles, 
it is also possible to ship new versions of the web components 
without another release of the main app.

The build time shrinks here dramatically as we serve it and have got rid of the multiple steps in the build.
Also the build doesn't break anymore. And we can make changes to the elements project independent of demo app. 

### Deployment/Bundling

We provide following options for bundling:
- [x] bundle zone-full
- [x] bundle zone-less
- [ ] bundle un-compiled (elements are created on client side)

#### Setup zone-full build and serve

The serve script for zone-full builds is already set as explained at the beginning.
`npm start` or `npm run serve:element`

To setup it up for builds follow these steps:

1. Create a new folder `tooling` and inside create a file `element-bundling.js`.  
insert following code:
```javascript
const fs = require('fs-extra');

(async function build() {

  await fs.ensureDir('./dist/elements');
  await fs.rename('./dist/elements/main-es2015.js', './dist/elements/elements.js', function(err) {
    if ( err ) console.log('ERROR: ' + err);
  });

})();
```
2. Add a new scripts entry to `package.json` in the root folder to use your new configuration.
   ```json
   {
     ...
     "scripts": {
       ... !!! CHANGES HERE !!!
       "build:all:bundled": "npm-run-all --sequential build:all generate:bundles",
       "build:all": "npm-run-all --parallel build:element",
       "generate:bundles": "node tooling/element-bundling.js",
       "build:element": "ng build --project elements --single-bundle",
       "build:demo": "ng build",
       ...
     },
     ...
   }
   ```       
            
#### Setup zone-less build

1. Copy `polyfills.ts` from `projects/elements/src` to the same location and rename it to `polyfills-zone-less.ts`
2. Open `polyfills-zone-less.ts` in `projects/elemets/src` and comment out the `zone.js` import.
```typescript
/***************************************************************************************************
 * Zone JS is required by default for Angular itself.
 */
// !!! CHANGES HERE !!!
// import 'zone.js/dist/zone';  // Included with Angular CLI.
```
3. Add a new configuration for build and serve to the `elements` project in `angular.json`
```json
{
  ...
  "projects": {
    ...
    "elements": {
      ...
      "architect": {
        "build": {
          ...
          "configurations": {
            ... !!! CHANGES HERE !!!
            "zoneLess": {
              "polyfills": "projects/elements/src/polyfills-zone-less.ts"
            }
          }
        },
        "serve": {
          ...
          "configurations": {
            ... !!! CHANGES HERE !!!
            "zoneLess": {
              "browserTarget": "elements:build:zoneLess"
            }
          }
        }   
      }
    }
  },
  ...
}
```
4. Add a new scripts entry to `package.json` in the root folder to use your new configuration.
```json
{
  ...
  "scripts": {
    ...                                                 !!! CHANGES HERE !!!
    "build:all": "npm-run-all --parallel build:element build:element:zone-less",    
    ... !!! CHANGES HERE !!!
    "start:zone-less": "npm-run-all --parallel serve:demo serve:element:zone-less",
    "build:element:zone-less": "ng build --project elements --single-bundle --output-path dist/elements-zone-less -c=zoneLess",
    "serve:element:zone-less": "ng serve --project elements --single-bundle --port 4242 -c=zoneLess",
    ...
  },
  ...
}
```
5. Add following to `element-bundling.js` located in `tooling`:
```javascript
...

(async function build() {
  ...
  // !!! CHANGES HERE !!!
  await fs.ensureDir('./dist/elements-zone-less');
  await fs.rename('./dist/elements-zone-less/main-es2015.js', './dist/elements-zone-less/elements.js', function(err) {
    if ( err ) console.log('ERROR: ' + err);
  });

})();

``` 
6. `npm run start:zone-less`

#### Setup un-compiled build
@TODO

## Loading strategies
- [x] bundled with app
- [x] lazy loaded pre compiled
- [ ] lazy loaded un-compiled

### Elements Bundled with App

When we bundle the created elements into the demo app we are not able to leverage lazy loading. 
Anyway here the steps to achieve this: 

3. Add a new configuration for build and serve to the `demo` project in `angular.json`
to provide builds with elements, zone-less and zone-full, included in the app bundle: 

```json
{
  ...
  "projects": {
    ...
    "demo": {
      ...
      "architect": {
        "build": {
          ...
          "configurations": {
            ... !!! CHANGES HERE !!!
            "withElements": {
              "scripts": [
                "dist/elements/elements.js"
              ]
            },
            "withElementsZoneLess": {
              "scripts": [
                "dist/elements-zone-less/elements.js"
              ]
            }
          }
        },
        "serve": {
          ...
          "configurations": {
            ... !!! CHANGES HERE !!!
            "withElements": {
              "browserTarget": "demo:build:withElements"
            },
            "withElementsZoneLess": {
              "browserTarget": "demo:build:withElementsZoneLess"
            }
          }
        }   
      }
    }
  },
  ...
}
```
4. Now you can place the web-component directly in the template and it renders. 
Adopt `app.component.ts` in `projects/demo/src/app` to test it:
````typescript
...
@Component({
  selector: 'app-root',
  template: `
      ...
      <web-component
              [value]="primitive" (update)="log($event)">
      </web-component>
      ...
  `
})
export class AppComponent {
  ...
}
````
5. Add a new scripts entry to `package.json` in the root folder to use your new configuration:
```json
{
  ...
  "scripts": {
    ... !!! CHANGES HERE !!!
    "serve:demo:with-elements": "ng serve --project demo -c=withElements",
    "serve:demo:with-elements:zone-less": "ng serve --project demo -c=withElementsZoneLess"  }
}
```
6. `npm run serve:demo:with-elements` 

### Elements Pre-compiled Lazy Loaded

The lazy loaded strategy is already included and described in the section setup. 
It's performs way better than the bundled strategy and also brings points for the first meaningful pain 
as the elements are loaded only if they are needed.

### Elements Un-compiled Lazy Loaded

@TODO

## Productivity Helpers
@TODO
- push pipe
- let directive
- cd directive
