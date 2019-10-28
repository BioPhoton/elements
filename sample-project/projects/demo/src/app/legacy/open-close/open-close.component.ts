import {Component, Input} from "@angular/core";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {BehaviorSubject} from "rxjs";
import {first} from "rxjs/operators";

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
      <div (click)="toggle()" [@openClose]="isOpen ? 'open' : 'closed'" class="open-close-container">
          <p>The box is now {{ isOpen ? 'Open' : 'Closed' }}!</p>
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

  toggle() {
    this.isOpen = !this.isOpen;
  }

}
