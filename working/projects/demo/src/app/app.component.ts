import { Component } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'demo-root',
  template: `
      <div class="wrapper">
          <div style="width: 400px">
              <h2>Controls</h2>
              <p>Username: <input type="text" [(ngModel)]="primitive"></p>
          </div>
          <div>
              <ng-template #loading>Loading...</ng-template>
              <ng-template #error>Loading...</ng-template>
              <web-component
                      *axLazyElement="'elements/main.js'; loadingTemplate: loading; errorTemplate: error"
                      [value]="primitive">
              </web-component>
          </div>
      </div>
  `,
  styles: [`
      .wrapper {
          display: flex;
      }

      .wrapper > div {
          padding: 20px;
      }
  `]
})
export class AppComponent {
  primitive = 'Testt';
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
