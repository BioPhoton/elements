import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
      primitive: <input [(ngModel)]="primitive"><br/>
      <button (click)="increment()">trigger immutable change</button>
      <ng-template #loading>Loading...</ng-template>
      <ng-template #error>Error!</ng-template>

      <web-component
              *axLazyElement="'elements/main.js'; loadingTemplate: loading; errorTemplate: error"
              [value]="primitive" (update)="log($event)">
      </web-component>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  primitive = 42;
  o = {primitive: this.primitive};
  o$ = new BehaviorSubject(this.o);

  constructor() {
  }

  increment() {
    this.primitive = this.primitive + 1;
    this.o = {primitive: this.primitive};
    this.o$.next(this.o);
  }

  log(v) {
    console.log(v);
  }

}
