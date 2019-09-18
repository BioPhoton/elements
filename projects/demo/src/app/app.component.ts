import {Component} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ORIGINAL_MODEL} from "./models/oroginal.model";

@Component({
  selector: 'app-root',
  template: `
      Primitive: <input [(ngModel)]="primitive">
      <button (click)="changeValueImmutable()">trigger immutable change</button>
      <hr/>

      <!-- here to demo element bundled into app
      <web-component
              [value]="primitive" (update)="log($event)">
      </web-component>
      -->
      <ng-template #loading>Loading...</ng-template>
      <ng-template #error>Error!</ng-template>

      <!-- Replace [value]="primitive" with [value]="o" to use an object instead of primitive value -->
      <web-component
              *axLazyElement="'elements/main.js'; loadingTemplate: loading; errorTemplate: error"
              [value]="primitive" (update)="log($event)">
      </web-component>
      
      <hr/>
      
      <mat-web-component
              *axLazyElement="'elements/main.js'; loadingTemplate: loading; errorTemplate: error"
              [value]="primitive" (event)="log($event)">
      </mat-web-component>
    <hr/>
 
    <dynamic-form-web-component
            *axLazyElement="'elements/main.js'; loadingTemplate: loading; errorTemplate: error"
            [formModel]="fromModel" (change)="log($event)">
    </dynamic-form-web-component>
  `
})
export class AppComponent {
  primitive = 42;
  o = {primitive: this.primitive};
  o$ = new BehaviorSubject(this.o);

  fromModel = ORIGINAL_MODEL;
  fromModel$ = new BehaviorSubject(this.fromModel);

  constructor() {
  }

  changeValueImmutable() {
    this.primitive = this.primitive + 1;
    this.o = {primitive: this.primitive};
    this.o$.next(this.o);

   this.fromModel[0].label = this.primitive + '';
   this.fromModel = [...this.fromModel];
   this.fromModel$.next(this.fromModel);
  }

  log(v) {
    console.log(v);
  }

}
