import { Component } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
      Primitive:: <input [(ngModel)]="primitive"><br/>
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
