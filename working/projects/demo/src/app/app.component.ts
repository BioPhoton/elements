import { Component } from '@angular/core';

@Component({
  selector: 'demo-root',
  template: `
      <div class="wrapper">
          <div style="width: 400px">
              <h2>Controls</h2>
              <p>Username: <input type="text" [(ngModel)]="username"></p>
          </div>
          <div>
              <ng-template #loading>Loading...</ng-template>
              <ng-template #error>Loading...</ng-template>
              <web-component
                      *axLazyElement="'elements/main.js'; loadingTemplate: loading; errorTemplate: error"
                      [username]="username">
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
  username = 'Test';
}
