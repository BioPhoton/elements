1. `ng new elements --create-application false`
2. `ng add application demo`
3. `ng add application elements`
4. `ng add @angular/elements --project elements`
5. `ng add ngx-build-plus --project elements`
6. create new file in root named `proxy.conf.json` and insert following content 
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
7. Add `proxy.config.json` to `angular.json` under demo projects serve options:
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
              ...
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
9. add following lines to the scripts section in your `package.json` located in root level
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
10. `npm i -S @angular-extensions/elements`
11. Delete files `projects/demo/src/app` folder
12. Create `app.component.ts` into `projects/demo/src/app` folder and insert following content:
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
13. Create `app.module.ts` into `projects/demo/src/app` folder and insert following content:
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
14. Delete files `projects/demo/src/app` folder
15. Create `web.component.ts` into `projects/elements/src/app` folder and insert following content:
```typescript
import {ChangeDetectionStrategy, Component, Input, Output} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  template: `
      <h1>WebComponent</h1>
      <p>@Input() value: {{value | json}}</p>
        <button (click)="update.next(value)">trigger output</button>
  `,
  // Change to .OnPush to see CD not working
  changeDetection: ChangeDetectionStrategy.Default
})
export class WebComponent {
  @Input() value: string;
  @Output() update = new Subject();
}
```
16. Create `app.module.ts` into `projects/elements/src/app` folder and insert following content:
```typescript
import {BrowserModule} from '@angular/platform-browser';
import {ApplicationRef, DoBootstrap, Injector, NgModule} from '@angular/core';
import {createCustomElement} from '@angular/elements';
import {WebComponent} from './web.component';

export const elements: any[] = [
  [WebComponent, 'web-component']
];
export const DECLARATIONS = elements.map(a => a[0]);

@NgModule({
  declarations: [DECLARATIONS],
  imports: [BrowserModule],
  entryComponents: [DECLARATIONS]
})
export class AppModule implements DoBootstrap {

  constructor(private injector: Injector) {

  }

  ngDoBootstrap(appRef: ApplicationRef): void {
    elements.forEach(([componentClass, selector]) => {
      const el = createCustomElement(componentClass, {injector: this.injector});
      customElements.define(selector, el);
    });
  }

}
```
17. `npm start`
