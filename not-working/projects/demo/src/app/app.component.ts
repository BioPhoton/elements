import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements AfterViewInit {
  primitive = 42;
  o = {primitive: this.primitive};
  o$ = new BehaviorSubject(this.o);

  constructor(private elementRef: ElementRef) {
  }

  ngAfterViewInit(): void {
    // this.elementRef.nativeElement.querySelector('ui-minimal')
    //  .setAttribute('value', this.object);
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
