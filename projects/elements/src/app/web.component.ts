import { Component, Input } from '@angular/core';

@Component({
  template: `
      <h1>WebComponent</h1>
      <p>Value: {{value}}</p>
  `
})
export class WebComponent {
  @Input() value: string;
}
