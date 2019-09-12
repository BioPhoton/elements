import { Component, Input } from '@angular/core';

@Component({
  selector: 'element-wc',
  template: `
      <h1>WebComponent</h1>
      <p>Username: {{username}}</p>`,
  styles: [`
      :host {
          display: block;
          padding: 20px;
          border: 1px solid #000;
      }
  `]
})
export class WebComponent {
  @Input() username: string;
}
