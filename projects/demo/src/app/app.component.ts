import { Component } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
      <web-component
              *axLazyElement="'elements/main.js'"
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
