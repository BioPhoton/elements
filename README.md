# Prove Of Concept for Angular elements and third party libs

<!-- npm i -g markdown-toc && markdown-toc ./README.md -i -->

<!-- toc -->

- [Project Setup and Build](#project-setup-and-build)
  * [Version Information](#version-information)
  * [Setup for Angular elements](#setup-for-angular-elements)
  * [Setup for Lazy Loading of Elements](#setup-for-lazy-loading-of-elements)
    + [Setup Consumer Application](#setup-consumer-application)
    + [Setup WebComponent Application](#setup-webcomponent-application)
  * [Setup for Angular Material](#setup-for-angular-material)
  * [Setup for Angular Dynamic Forms](#setup-for-angular-dynamic-forms)
- [ChangeDetection and Angular Elements](#changedetection-and-angular-elements)
  * [Zone-less](#zone-less)
    + [Setup Running Zone-Less](#setup-running-zone-less)
    + [Problems with Components when Running Zone Less](#problems-with-components-when-running-zone-less)
      - [Template Bindings](#template-bindings)
      - [Input Bindings](#input-bindings)
      - [Output Bindings](#output-bindings)
      - [Dom Events](#dom-events)
      - [Animations](#animations)
      - [Internal Logic](#internal-logic)
    + [Problems with WebComponents when Running Zone Less](#problems-with-webcomponents-when-running-zone-less)
  * [Zone-full](#zone-full)
    + [Parent-Zone Hack](#parent-zone-hack)
    + [Context-Aware-Zones-Zones](#context-aware-zones-zones)
- [Developer Workflow](#developer-workflow)
  * [Development](#development)
  * [Deployment/Bundling](#deploymentbundling)
    + [Setup Zone-Full Pre-Compiled Build and Serve Scripts](#setup-zone-full-pre-compiled-build-and-serve-scripts)
    + [Setup Zone-Less Build and Serve Scripts](#setup-zone-less-build-and-serve-scripts)
    + [Setup Un-Compiled Build and Serve Scripts](#setup-un-compiled-build-and-serve-scripts)
    + [Setup Stand Alone Project as well as Build and Serve Scripts](#setup-stand-alone-project-as-well-as-build-and-serve-scripts)
- [Styling Strategies](#styling-strategies)
  * [View Encapsulation with Option `None`](#view-encapsulation-with-option-none)
  * [View Encapsulation with Option `ShadowDom`](#view-encapsulation-with-option-shadowdom)
  * [View Encapsulation with Option `Emulated`](#view-encapsulation-with-option-emulated)
  * [Setup Build and Serve Scripts for the Different Styling Strategies](#setup-build-and-serve-scripts-for-the-different-styling-strategies)
- [Loading Strategies](#loading-strategies)
  * [Elements Bundled with App](#elements-bundled-with-app)
  * [Elements Pre-compiled Lazy Loaded](#elements-pre-compiled-lazy-loaded)
  * [Elements Un-compiled Lazy Loaded](#elements-un-compiled-lazy-loaded)
- [Productivity Helpers](#productivity-helpers-pocs)
  * [Push Pipe](#push-pipe)
  * [Let Structural Directive](#let-structural-directive)
  * [CdOn Directive](#cdon-directive)
- [Browser Support and Backwards Compatibility](#browser-support-and-backwards-compatibility)

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
live-server                       | 1.2.1

Browser:

Name   | Version
-------|--------------
Chrome | 76.0.3809.132

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
    "elements": {
      "architect": {
          ...
          "build": {
             ...
             "options": {
             ...
             "singleBundle": true,
             "bundleStyles": false,
             "keepPolyfills": true
             },
            ...
          },
          "serve": {
            ...
            "options": {
              ...
              "singleBundle": true,
              "bundleStyles": false,
              "keepPolyfills": true,
              "port": 4242
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
    "start": "npm-run-all --parallel serve:demo serve:elements",
    "serve:demo": "ng serve --project demo",
    "serve:elements": "ng serve --project elements --port 4300"
  },
  ...
}
```

### Setup for Lazy Loading of Elements

#### Setup Consumer Application

1. `npm i -S @angular-extensions/elements`,
2. Create folder `angular-elements` in `projects/demo/src/app`.
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
  elementConfigs: [
    { tag: 'ui-form', url: BASIC_ELEMENTS_URL },
    { tag: 'ui-overview', url: BASIC_ELEMENTS_URL }
  ],
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

10. Delete files in all `app.component.*` files in `projects/demo/src/app` folder.
11. Create `app.component.ts` in `projects/demo/src/app` folder and insert following content:
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

#### Setup WebComponent Application
1. Delete all file in `projects/elements/src/app`.
2. Create `web.component.ts` into `projects/elements/src/app` folder and insert following content:
```typescript
import {ChangeDetectionStrategy, Component, Input, Output} from '@angular/core';
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
import {BrowserModule} from '@angular/platform-browser';
import {DoBootstrap, Injector, NgModule} from '@angular/core';
import {createCustomElement} from '@angular/elements';
import {WebComponent} from './dynamic-form.component';

export const ANGUlAR_ELEMENTS: any[] = [
  [WebComponent, 'web-component'],
  [MatWebComponent, 'mat-web-component']
  [DynamicFormComponent, 'dynamic-form-component']
];
export const DECLARATIONS = [WebComponent, MatWebComponent, DynamicFormWebComponent];

@NgModule({
  declarations: [DECLARATIONS],
  imports: [BrowserModule],
  entryComponents: [DECLARATIONS]
})
export class AppModule implements DoBootstrap {

  constructor(private injector: Injector) {

  }

  ngDoBootstrap(): void {
    ANGUlAR_ELEMENTS.forEach(([componentClass, selector]) => {
      const element = createCustomElement(componentClass, {injector: this.injector});
      customElements.define(selector, element);
    });
  }

}
```
8. `npm start`

### Setup for Angular Material

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
  `
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

## ChangeDetection and Angular Elements

There are 2 way how to manage change detection in angular components:
1. Zone-less (change detection needs to be managed manually)
2. Zone-full (change detection is managed over by `zone.js`)

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

#### Setup Running Zone-Less

To run a angular project zone-less following steps should be made:
1. Open `main.ts` of your **consumer project** and pass `'noop'` as `NgZone` instance under the `compilerOptions` in the bootstrap call:
```typescript
...
//                                                 !!! CHAGNE HERE !!! 
platformBrowserDynamic().bootstrapModule(AppModule, {ngZone: 'noop'})
  .catch(err => console.error(err));

```
2. Test it by importing `NgZone` into `app.component.ts` and log the instance:
```txpescript
 constructor(private ngZone: NgZone) {
    console.log('ngZone', this.ngZone);
 }
```
You should see `NoopNgZone` as class name. That's it. Now we run zone-less.

Now let's setup build and serve scripts to switch between zone-full and zone-less.

3. Copy `main.ts` and rename it to `main.zone-less.ts`. Then revert `main.ts` to the original state.
4. Copy `polyfills.ts` and rename it to `polyfills.zone-less.ts`. 
Open it and comment out following line:
```typescript
/***************************************************************************************************
 * Zone JS is required by default for Angular itself.
 */
// !!! CHANGES HERE !!!
// import 'zone.js/dist/zone';  // Included with Angular CLI.
```
5. Open `angular.json` and add following configurations:

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
                "zoneLess": {
                  "main": "projects/demo/src/main.zone-less.ts",
                  "polyfills": "projects/demo/src/polyfills.zone-less.ts"
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
6. Add a new scripts entry to `package.json` in the root folder to use your new configuration.
```json
{
  ...
  "scripts": {
    ... !!! CHANGES HERE !!!
    "serve:all:demo-zone-less": "npm-run-all --parallel serve:demo:zone-less serve:elements",
    "serve:demo:zone-less": "ng serve --project demo -c=zoneLess"
   },
  ...
}
```
7. Run `npm run serve:all:zone-less` and `npm run start` and check the difference in the console log's.   

**NOTE:**   
From now on your preferred serve script should be `npm run serve:all:demo-zone-less`.  
This is the reason because when using elements in angular we never use their zone instance.


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

Let's look at a simple exampes where we render the actual time to the view:
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

1. Insert following code into `angular-elements.module.ts` located in `projects/demo/src/app/angular-elements`: 
```typescript
export class AngularElementsModule {
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

## Developer Workflow

### Development

After implementing the setup from above we only need `npm start` to run both: 
- Serving the element (we serve the element with the new changes in the build options)
- And serving the application (we use default cli commands)

Over a proxy config we redirect requests for the elements to the first served angular project.
In ths way we can work on both project in parallel and don't break any running serve or break other build processes.

As the bundle is now independent from the main app and we lazy loading the bundles, 
it is also possible to ship new versions of the web components 
without another build/release of the main app.

The build time shrinks here dramatically as we serve it and have got rid of the multiple steps in the build.
Also the build doesn't break anymore. And we can make changes to the elements project independent of demo app. 

### Deployment/Bundling

In the previous sections we already set up a lot of scripts to have a convenient way to switch between all different setups.
Now let's complete the serving as well as add scripts for building the app. 

We provide following options for builds:
- [x] bundle pre-compiled zone-full
- [x] bundle pre-compiled zone-less
- [x] bundle un-compiled (elements are created on client side)

#### Setup Zone-Full Pre-Compiled Build and Serve Scripts

The serve script for zone-full builds is already set as explained at the beginning.
`npm start` or `npm run serve:elements`.

To setup it up for builds follow these steps:

1. `npm i -D concat`
2. Create a new folder `tooling` and inside create a file `elements-bundling.js`.  
insert following code:
```javascript
const fs = require('fs-extra');
const concat = require('concat');

Promise.all([
  // Zone-Full Bundling
  // es2015
  bundleZoneFullEs2015()
])
  .then(() => {
    console.log('Bundeled elements success-fully');
  })
  .catch((error) => {
    console.error(error);
  });

// ===========  

// Zone-Full Bundling

// es2015

function bundleZoneFullEs2015() {
  return fs.ensureDir('./dist/elements')
    .then(() => {
      return concat([
      './dist/elements/polyfills-es2015.js',
       './dist/elements/styles-es2015.js',
       './dist/elements/main-es2015.js'
      ], './dist/elements/elements.js');
    })
    .catch(err => {
      console.error('Error while bundling elements check if you build it already');
    });
}
```

3. Add a new scripts entry to `package.json` in the root folder to use your new configuration.
   ```json
   {
     ...
     "scripts": {
       ... !!! CHANGES HERE !!!
       "build:all:bundled": "npm-run-all --sequential build:all generate:bundles",
       "build:all": "npm-run-all --parallel build:elements",
       "generate:bundles": "node tooling/elements-bundling.js",
       "build:elements": "ng build --project elements",
       "build:demo": "ng build",
       ...
     },
     ...
   }
   ```       
            
#### Setup Zone-Less Build and Serve Scripts

Now let's complete the zone-less part. We will implement different builds for a zone-less consumer and provider applications.

As we know from the chapter about components and zone-less setups we either replace or "noop" the ngZone instante of the provider side, the application where our elements are placed.
Therefore we can setup a build and serve script that excludes `zone.js` from our `elements.js` bundle. 

1. Copy `polyfills.ts` from `projects/elements/src` to the same location and rename it to `polyfills.zone-less.ts`
2. Open `polyfills.zone-less.ts` in `projects/elemets/src` and comment out the `zone.js` import.
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
              "polyfills": "projects/elements/src/polyfills.zone-less.ts"
            }
          }
        },
        "serve": {
          ...
          "configurations": {
            ... !!! CHANGES HERE !!!
            "zoneLess": {
              "outputPath": "dist/elements-zone-less",
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
4. Add new script entries to `package.json` in the root folder to use your new configuration.
```json
{
  ...
  "scripts": {
    ...                                                 !!! CHANGES HERE !!!
    "build:all": "npm-run-all --parallel build:elements build:elements:zone-less",    
    ...                                                                           !!! CHANGES HERE !!!
    "serve:all:elements-zone-less": "npm-run-all --parallel serve:demo:zone-less serve:elements:zone-less",
                                                                            ... !!! CHANGES HERE !!!
    "serve:all:demo-zone-less": "npm-run-all --parallel serve:demo:zone-less serve:elements:zone-less",
    "build:elements:zone-less": "ng build --project elements -c=zoneLess",
    "serve:elements:zone-less": "ng serve --project elements -c=zoneLess --port 4242",
    ...
  },
  ...
}
``` 
As a last piece let's complete the build scripts for zone-less elements: 
 
6. Add following to `element-bundling.js` located in `tooling`:
```javascript
...
Promise.all([
  ... !!! CHANGES HERE !!!
  // Zone-Less Bundling
  // es2015
  bundleZoneLessEs2015()
 ])

...

... !!! CHANGES HERE !!!
// Zone-Less Bundling

// es2015
function bundleZoneLessEs2015() {
  return fs.ensureDir('./dist/elements-zone-less')
    .then(() => {
      return concat([
               './dist/elements/styles-es2015.js',
               './dist/elements/main-es2015.js'
      ], './dist/elements-zone-less/elements.js')
    }).catch(err => {
      console.error('Error while bundling elements-zone-less check if you build it already');
    });
}


```

**NOTE:**  
At the time of writing `ngx-build-plus` didn't have proper options to create a single bundle so we had to implement a custom build step.
The related issue is [#30](https://github.com/manfredsteyer/ngx-build-plus/issues/130)
7. `npm run serve:all:demo-zone-less` or `npm run serve:all:elements-zone-less`

That's it! :)

We have now serve and build scripts for:
- zone-full demo + pre-compiled zone-full elements
- zone-full demo + pre-compiled zone-less elements
- zone-less demo + pre-compiled zone-less elements

#### Setup Un-Compiled Build and Serve Scripts

Let's quickly clarify wording. When we speak about **pre-compiled** elements we speak about a bundle that includes the creation of the elements.
To be more specific we speak about a bundle that includes the call to 
```typescript
const element = createCustomElement(componentClass, {injector: this.injector});
customElements.define(selector, element);
```

If this is done in the consumer bundle we speak about **un-compiled** elements.
Maybe the wording is not perfect, but huh.. we have to start somewhere. ;)

@ TODO

#### Setup Stand Alone Project as well as Build and Serve Scripts

We mentioned it shortly in the section for zones, but we never did something with it.

Let's setup a project to the the stan alone version of the web components.

As we already have a serve script for our `elements` project in the right setup let's start to implement the development setup with serve scripts first.  

1. Create a new folder in the `projects` folder called `demo-stand-alone`.
2. Create a file `scripts.js` and insert following content: 
```javascript

// WebComponents

const webComponent = document.getElementsByTagName('web-component')[0];
const matWebComponent = document.getElementsByTagName('mat-web-component')[0];
const dynamicFormComponent = document.getElementsByTagName('dynamic-form-component')[0];

// Inputs
const btnSetAttribute = document.getElementById('setAttribute');
btnSetAttribute.addEventListener('click', () => {
  setAttribute();
});

const btnSetProperty = document.getElementById('setProperty');
btnSetProperty.addEventListener('click', () => {
  setProperty();
});

dynamicFormComponent.formModel = getJsonModel();

// Outputs

webComponent.addEventListener('update', (customEvent) => {
  render(customEvent.detail);
});

matWebComponent.addEventListener('event', (customEvent) => {
  render(customEvent.detail.target.value);
});

dynamicFormComponent.addEventListener('change', (customEvent) => {
  console.log('change', customEvent);
  render(customEvent.detail.group.value);
});


// === Helper

function setAttribute() {
  webComponent.setAttribute('value', 'setAttribute' + Math.random());
  matWebComponent.setAttribute('value', 'setAttribute' + Math.random());
}


function setProperty() {
  webComponent.value = 'setProperty' + Math.random();
  matWebComponent.value = 'setProperty' + Math.random();
}

function render(customEvent) {
  const viewUpdate = document.getElementById('update');
  viewUpdate.innerHTML = JSON.stringify(customEvent);
}

function getJsonModel() {
  return [
    {
      "type": "INPUT",
      "id": "sampleInput",
      "label": "Sample Input",
      "maxLength": 42,
      "placeholder": "Sample input"
    },
    {
      "type": "RADIO_GROUP",
      "id": "sampleRadioGroup",
      "label": "Sample Radio Group",
      "options": [
        {
          "label": "Option 1",
          "value": "option-1",
        },
        {
          "label": "Option 2",
          "value": "option-2"
        },
        {
          "label": "Option 3",
          "value": "option-3"
        }
      ],
      "value": "option-3"
    },
    {
      "type": "CHECKBOX",
      "id": "sampleCheckbox",
      "label": "I do agree"
    }
  ];
}

```

3. Create a `index.dev.html` file in `projects/demo-stand-alone` and insert following content:
```html
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" type="text/css" href="styles.css" media="screen" />
</head>
<body>

<h1>WebComponent ng serve</h1>

<button id="setAttribute">webComponent.setAttribute('value', 'test)</button>
<br>
<button id="setProperty">webComponent.value = 'test</button>
<br>
Update: <code id="update">No Update Happened Yet</code>
<web-component></web-component>
<hr>
<mat-web-component></mat-web-component>
<hr>
<dynamic-form-component></dynamic-form-component>
<!-- Here is our web component -->

<script type="text/javascript" src="elements/polyfills.js"></script>
<script type="text/javascript" src="elements/styles.js"></script>
<script type="text/javascript" src="elements/main.js"></script>

<script type="text/javascript" src="scripts.js"></script>
</body>
</html>
```
4. `npm i live server -D`
5. Add new script entries to `package.json` in the root folder to serve your new project.
```json
{
  ...
  "scripts": {
   ...
   "serve:all:demo-stand-alone:hot-elements": "npm-run-all --parallel serve:demo-stand-alone:hot-elements serve:elements",
   "serve:demo-stand-alone:hot-elements": "cd projects/demo-stand-alone && live-server --host=localhost --port=4200 --proxy=/elements/:http://localhost:4242/ --open=index.dev.html",
    ...
  },
  ...
}
``` 

6. Test your setup with `npm run serve:all:demo-stand-alone:hot-elements`.

Note as out build process takes way longer than serving a simple html file we may wait a bit and hit refresh in the browser after the `elements` projects file is served by the Angular CLI.
Then we should see a working result.

Now finally let's test a bundled version of the elements. 

7. Create a `index.html` file in `projects/demo-stand-alone` and insert following content:
```html
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" type="text/css" href="styles.css" media="screen" />
</head>
<body>

<h1>WebComponent Final-Bundle</h1>

<button id="setAttribute">webComponent.setAttribute('value', 'test)</button>
<br>
<button id="setProperty">webComponent.value = 'test</button>
<br>
Update: <code id="update">No Update Happened Yet</code>
<web-component></web-component>
<hr>
<mat-web-component></mat-web-component>
<hr>
<dynamic-form-component></dynamic-form-component>
<!-- Here is our web component -->

<script type="text/javascript" src="elements/elements.js"></script>

<script type="text/javascript" src="scripts.js"></script>
</body>
</html>
```
8. Create a `styles.css` file in `projects/demo-stand-alone` and insert following content:
```css
h1 {
  color:forestgreen !important;
}

.mat-form-field-infix .mat-input-element {
  color: #69f0ae;
}
```
9. Add new script entries to `package.json` in the root folder to serve your new project.
```json
{
  ...
  "scripts": {
   ... !!! NOTE: THIS IS JUST A COMMENT !!!
   "serve:all:demo-stand-alone:bundled-elements": "NOTE: serve:elements:bundled and serve:demo-stand-alone:bundled-elements needs to be run in separate consoles :(",
   ... !!! CHANGES HERE !!!
   "serve:elements:bundled": "npm run build:elements && npm run generate:bundles && cd dist/elements/ && live-server --host=localhost --port=4242 --no-browser",
   "serve:demo-stand-alone:bundled-elements": "cd projects/demo-stand-alone && live-server --host=localhost --port=4200 --proxy=/elements/:http://localhost:4242/",
   ...
  },
  ...
}
``` 

10. Test your setup: `npm run serve:all:demo-stand-alone:bundled-elements`.

Here we have to spin up 2 different consoles to test it.
Open a first console and run `serve:elements:bundled` to serve the elements file.
Then open a second and after the process in the first one is finished run `serve:demo-stand-alone:bundled-elements`.
 
Open the browser under localhost:4200 and you should see a working result.

## Styling Strategies

- [x] View encapsulation with option `None`
- [x] View encapsulation with option `ShadowDom`
- [x] View encapsulation with option `Emulated`

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
Here, same as with `ViewEncapsulation.ShadowDom` we can't override styling of our web-components.

### Setup Build and Serve Scripts for the Different Styling Strategies 

This will be a pretty big change is out code base. So be cautious and read carefully!

From the above strategies we can go with 2 different approaches:
- Bundling global styles with the web components and use `ViewEncapsulation.ShadowDom` (styles are independent of consumer application)
- Exclude global styles from the web components bundle and use `ViewEncapsulation.None` (styles are applied by consumer application)
 
Together with the zone-less scripts for build and serve we end up with following variants ov the bundle:
- Environment: **Production**, Change detection: **Zone-Full**, Global styles: **included**, View encapsulation: **ShadowDom**
- Environment: **Production**, Change detection: **Zone-Full**, Global styles: **excluded**, View encapsulation: **None**
- Environment: **Production**, Change detection: **Zone-Less**, Global styles: **included**, View encapsulation: **ShadowDom**
- Environment: **Production**, Change detection: **Zone-Less**, Global styles: **excluded**, View encapsulation: **None**
- Environment: **Development**, Change detection: **Zone-Full**, Global styles: **included**, View encapsulation: **ShadowDom**
- Environment: **Development**, Change detection: **Zone-Full**, Global styles: **excluded**, View encapsulation: **None**
- Environment: **Development**, Change detection: **Zone-Less**, Global styles: **included**, View encapsulation: **ShadowDom**
- Environment: **Development**, Change detection: **Zone-Less**, Global styles: **excluded**, View encapsulation: **None**

Another problem next to the number of different bundles is the view encapsulation.
It has to be different for different builds.

We need a way to have it dynamic dependent on the bundle variant. 
One way to approach this could be to move the setting for `encapsulation` from the component to the `environment.ts` file and use environment settings to solve our problem.

**Setup `environment' files**
1. Open the folder `projects/elements/src/environments` and delete the `environments.prod.ts` file.
2. Add following line to your `environments.prod.ts` file: 
```typescript
... !!! CHANGES HERE !!!
import {ViewEncapsulation} from "@angular/core";

export const environment = {
... !!! CHANGES HERE !!!
  encapsulation: ViewEncapsulation.None
};
...
```
3. Create following files: 
- `environment.devVeNo.ts`
- `environment.devVeSd.ts`
- `environment.prodVeNo.ts`
- `environment.prodVeSd.ts`
4. Insert following content into the created files:
```typescript
import {ViewEncapsulation} from "@angular/core";

export const environment = {
  production: false,
  encapsulation: ViewEncapsulation.None
};
```
5. Update the settings per file: 
- devVeNo: set key `production` to `false` and key `encapsulation` to `ViewEncapsulation.None`
- devVeSd: set key `production` to `false` and key `encapsulation` to `ViewEncapsulation.ShadowDom`
- prodVeNo: set key `production` to `true` and key `encapsulation` to `ViewEncapsulation.None`
- prodVeSd: set key `production` to `true` and key `encapsulation` to `ViewEncapsulation.ShadowDom`

**Adopt architect API**
1. In the `angular.json` file under `projects.elements.architect.build.configurations` delete all settings and insert following:
```json
"prodVeNo": {
  "fileReplacements": [
    {
      "replace": "projects/elements/src/environments/environment.ts",
      "with": "projects/elements/src/environments/environment.prodVeNo.ts"
    }
  ],
  "optimization": true,
  "sourceMap": false,
 "namedChunks": false,
  "aot": true,
  "extractLicenses": true,
  "vendorChunk": false,
  "buildOptimizer": true,
  "bundleStyles": false,
  "keepPolyfills": true
},
"prodVeSd": {
  "fileReplacements": [
    {
      "replace": "projects/elements/src/environments/environment.ts",
      "with": "projects/elements/src/environments/environment.prodVeSd.ts"
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
"devVeNo": {
  "fileReplacements": [
    {
      "replace": "projects/elements/src/environments/environment.ts",
      "with": "projects/elements/src/environments/environment.devVeNo.ts"
    }
  ]
},
"devVeSd": {
  "fileReplacements": [
    {
      "replace": "projects/elements/src/environments/environment.ts",
      "with": "projects/elements/src/environments/environment.devVeSd.ts"
    }
  ]
},
"prodZoneLessVeNo": {
  "outputPath": "dist/elements-zone-less",
  "polyfills": "projects/elements/src/polyfills.zone-less.ts",
  "fileReplacements": [
    {
      "replace": "projects/elements/src/environments/environment.ts",
      "with": "projects/elements/src/environments/environment.prodVeNo.ts"
    }
  ]
},
"prodZoneLessVeSd": {
  "outputPath": "dist/elements-zone-less",
  "polyfills": "projects/elements/src/polyfills.zone-less.ts",
  "fileReplacements": [
    {
      "replace": "projects/elements/src/environments/environment.ts",
      "with": "projects/elements/src/environments/environment.prodVeSd.ts"
    }
  ]
},
"devZoneLessVeNo": {
  "outputPath": "dist/elements-zone-less",
  "polyfills": "projects/elements/src/polyfills.zone-less.ts",
  "fileReplacements": [
    {
      "replace": "projects/elements/src/environments/environment.ts",
      "with": "projects/elements/src/environments/environment.devVeNo.ts"
    }
  ]
},
"devZoneLessVeSd": {
  "outputPath": "dist/elements-zone-less",
  "polyfills": "projects/elements/src/polyfills.zone-less.ts",
  "fileReplacements": [
    {
      "replace": "projects/elements/src/environments/environment.ts",
      "with": "projects/elements/src/environments/environment.devVeSd.ts"
    }
  ]
}
```

2. And under `projects.elements.architect.serve.configurations` delete all settings and insert following:
```json
"devVeNo": {
  "browserTarget": "elements:build:devVeNo"
},
"devVeSd": {
  "browserTarget": "elements:build:devVeSd"
},
"devZoneLessVeNo": {
  "browserTarget": "elements:build:devZoneLessVeNo"
},
"devZoneLessVeSd": {
  "browserTarget": "elements:build:devZoneLessVeSd"
}
```

3. Add following to `element-bundling.js` located in `tooling`:
```javascript
...
Promise.all([
  // Zone-Full Build
  
  ... !!! CHANGES HERE !!!
  // es2015 Style-Less
  bundleZoneFullStyleLessEs2015(),
  ...

  // Zone-Less Bundling
  ... !!! CHANGES HERE !!!
  // es2015 Style-Less
  bundleZoneLessStyleLessEs2015()
 ])

...

... !!! CHANGES HERE !!!
// Zone-Full Bundling

// es2015 style less
    function bundleZoneFullStyleLessEs2015() {
      return fs.ensureDir('./dist/elements')
        .then(() => {
          return concat([
            './dist/elements/polyfills-es2015.js',
            './dist/elements/main-es2015.js'
          ], './dist/elements/elements.style-less.js');
        })
        .catch(err => {
          console.error('Error while bundling elements check if you build it already');
        });
    }
... !!! CHANGES HERE !!!
// Zone-Less Bundling

// es2015 Style less
function bundleZoneLessStyleLessEs2015() {
  return fs.ensureDir('./dist/elements-zone-less')
    .then(() => {
      return concat([
        './dist/elements/polyfills-es2015.js',
        './dist/elements/main-es2015.js'
      ], './dist/elements-zone-less/elements.style-less.js')
    }).catch(err => {
      console.error('Error while bundling elements-zone-less check if you build it already');
    });
}
```
4. Now switch to under `projects.demo.architect.build.configurations` in the `angular.json`, delete all settings and insert following:
```json
"withElementsVeNo": {
  "scripts": [
    "dist/elements/elements.style.less.js"
  ]
},
"withElementsVeSd": {
  "scripts": [
    "dist/elements/elements.js"
  ]
},
"withElementsZoneLessVeNo": {
  "scripts": [
    "dist/elements-zone-less/elements.style-less.js"
  ]
},
"withElementsZoneLessVeSd": {
  "scripts": [
    "dist/elements-zone-less/elements.js"
  ]
},
"zoneLessVeNo": {
  "main": "projects/demo/src/main.zone-less.ts",
  "polyfills": "projects/demo/src/polyfills.zone-less.ts",
  "scripts": [
    "dist/elements-zone-less/elements.style-less.js"
  ]
},
"zoneLessVeSd": {
  "main": "projects/demo/src/main.zone-less.ts",
  "polyfills": "projects/demo/src/polyfills.zone-less.ts",
  "scripts": [
    "dist/elements-zone-less/elements.js"
  ]
}
```
5. And under `projects.demo.architect.serve.configurations` delete all settings but `production` and insert following:
```json
"withElementsVeNo": {
  "browserTarget": "demo:build:withElementsVeNo"
},
"withElementsVeSd": {
  "browserTarget": "demo:build:withElementsVeSd"
},
"withElementsZoneLessVeNo": {
  "browserTarget": "demo:build:withElementsZoneLessVeNo"
},
"withElementsZoneLessVeSd": {
  "browserTarget": "demo:build:withElementsZoneLessVeSd"
},
"zoneLessVeNo": {
  "browserTarget": "demo:build:zoneLessVeNo"
},
"zoneLessVeSd": {
  "browserTarget": "demo:build:zoneLessVeSd"
}
```
6. Create `index.dev.style-less.html` in folder `projects/demo-stand-alone` and insert following content:
```html
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" type="text/css" href="styles.css" media="screen"/>
  <link rel="stylesheet" type="text/css" href="indigo-pink.css" media="screen"/>
</head>
<body>

<h1>WebComponent ng serve</h1>

<button id="setAttribute">webComponent.setAttribute('value', 'test)</button>
<br>
<button id="setProperty">webComponent.value = 'test'</button>
<br>
Update: <code id="update">No Update Happened Yet</code>
<web-component></web-component>
<hr>
<mat-web-component></mat-web-component>
<hr>
<dynamic-form-component></dynamic-form-component>
<!-- Here is our web component -->

<script type="text/javascript" src="elements/polyfills.js"></script>
<script type="text/javascript" src="elements/main.js"></script>

<script type="text/javascript" src="scripts.js"></script>
</body>
</html>
```
7. Create `index.style-less.html` in folder `projects/demo-stand-alone` and insert following content:
```html
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" type="text/css" href="styles.css" media="screen" />
  <link rel="stylesheet" type="text/css" href="indigo-pink.css" media="screen" />
</head>
<body>

<h1>WebComponent Final-Bundle</h1>

<button id="setAttribute">webComponent.setAttribute('value', 'test)</button>
<br>
<button id="setProperty">webComponent.value = 'test</button>
<br>
Update: <code id="update">No Update Happened Yet</code>
<web-component></web-component>
<hr>
<mat-web-component></mat-web-component>
<hr>
<dynamic-form-component></dynamic-form-component>
<!-- Here is our web component -->

<script type="text/javascript" src="elements/elements.style-less.js"></script>

<script type="text/javascript" src="scripts.js"></script>
</body>
</html>
```

7. Replace the scripts section in your `package.json` in the root folder with following settings:
```json
{
    ... !!! CHANGES HERE !!!
  "scripts": {
    "ng": "ng",
    "start": "npm-run-all --parallel serve:demo serve:elements:veNo",
    "serve:all:elements-vENo": "npm-run-all --parallel serve:demo serve:elements:veNo",
    "serve:all:elements-vESd": "npm-run-all --parallel serve:demo serve:elements:veSd",
    "serve:all:elements-zone-less": "npm-run-all --parallel serve:demo serve:elements:zone-less",
    "serve:all:demo-zone-less": "npm-run-all --parallel serve:demo:zone-less serve:elements:veNo:zone-less",
    "serve:all:demo-stand-alone:hot-elements": "npm-run-all --parallel serve:demo-stand-alone:hot-elements serve:elements:veNo",
    "serve:all:demo-stand-alone:bundled-elements": "!!NOTE!!! => serve:elements:bundled and serve:demo-stand-alone:bundled-elements needs to be run in separate consoles :(",
    "build:all:bundled": "npm-run-all --sequential build:all generate:bundles",
    "build:all": "npm-run-all --parallel build:elements:veNo build:elements:veSd build:elements:veNo:zone-less build:elements:veSd:zone-less",
    "generate:bundles": "node ./tooling/elements-bundling.js",
    "build:elements:veNo": "ng build --project elements -c=prodVeNo",
    "build:elements:veSd": "ng build --project elements -c=prodVeSd",
    "build:elements:veNo:zone-less": "ng build --project elements -c=prodZoneLessVeNo",
    "build:elements:veSd:zone-less": "ng build --project elements -c=prodZoneLessVeSd",
    "serve:elements:veNo":           "ng serve --project elements -c=devVeNo",
    "serve:elements:veSd":           "ng serve --project elements -c=devVeSd",
    "serve:elements:veNo:zone-less": "ng serve --project elements -c=devZoneLessVeNo",
    "serve:elements:veSd:zone-less": "ng serve --project elements -c=devZoneLessVeSd",
    "serve:elements:veNo:bundled": "npm run build:elements:veNo && npm run generate:bundles && cd dist/elements/ && live-server --host=localhost --port=4242 --no-browser",
    "serve:elements:veSd:bundled": "npm run build:elements:veSd && npm run generate:bundles && cd dist/elements/ && live-server --host=localhost --port=4242 --no-browser",
    "build:demo": "ng build --prod",
    "serve:demo": "ng serve --project demo",
    "serve:demo:zone-less": "ng serve --project demo -c=zoneLess",
    "serve:demo:with-elements:VeNo": "ng serve --project demo -c=withElementsVeNo",
    "serve:demo:with-elements:VeSd": "ng serve --project demo -c=withElementsVeSd",
    "serve:demo:with-elements:VeNo:zone-less": "ng serve --project demo -c=withElementsZoneLessVeNo",
    "serve:demo:with-elements:VeSd:zone-less": "ng serve --project demo -c=withElementsZoneLessVeSd",
    "serve:demo-stand-alone:hot-elements-no-style": "cd projects/demo-stand-alone && live-server --host=localhost --port=4200 --proxy=/elements/:http://localhost:4242/ --open=index.dev.style-less.html",
    "serve:demo-stand-alone:hot-elements": "cd projects/demo-stand-alone && live-server --host=localhost --port=4200 --proxy=/elements/:http://localhost:4242/ --open=index.dev.html",
    "serve:demo-stand-alone:bundled-elements": "cd projects/demo-stand-alone && live-server --host=localhost --port=4200 --proxy=/elements/:http://localhost:4242/"
  },
  ...
}
```
6. `npm run serve:demo:with-elements` 

## Loading Strategies

There are different loading strategies. Some of them are not only convenient but also help to solve problems in change detection.   
In this document we discuss following strategies:
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
