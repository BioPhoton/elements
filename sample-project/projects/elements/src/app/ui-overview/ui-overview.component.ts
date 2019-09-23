import {Component, Input, Output, ViewEncapsulation} from '@angular/core';
import {BehaviorSubject, pipe, Subject} from 'rxjs';
import {map, scan, shareReplay, startWith, tap} from 'rxjs/operators';
import {environment} from "../../environments/environment";

@Component({
  templateUrl: './ui-overview.component.html',
  styleUrls: ['./ui-overview.component.scss'],
  encapsulation: environment.encapsulation,
})
export class UiOverviewComponent {
  swallowEvent = pipe(
    tap(([event, _]) => event.stopPropagation()),
    map(([_, element]) => element)
  );

  displayedColumnsSchaden: string[] = [
    'polizzeNummer',
    'vertragsSparte',
    'kundenName',
    'schadenStatus',
    'checkListStatus',
    'gesamtZahlung',
    'schadenDatum',
    'aktionen'
  ];

  displayedColumnsEntwurf: string[] = [
    'polizzeNummer',
    'vertragsSparte',
    'kundenName',
    'schadenDatum',
    'aktionen'
  ];

  expandedElement$ = new Subject<any | null>();
  isExpandedElement$ = this.expandedElement$
    .pipe(
      startWith(null),
      scan((prev, next): any | null => prev === next ? null : next),
      shareReplay(1)
    );
  expandedElement: any | null;

  schadenUebersicht$ = new BehaviorSubject<any[]>([]);

  @Input()
  set schadenUebersicht(data: any[]) {
    if (Array.isArray(data)) {
      this.schadenUebersicht$.next(data);
    }
  }

  schadenEntwurf$ = new BehaviorSubject<any[]>([]);

  @Input()
  set schadenEntwurf(data: any[]) {
    if (Array.isArray(data)) {
      this.schadenEntwurf$.next(data);
    }
  }

  isLoading$ = new BehaviorSubject(false);

  @Input()
  set isLoading(isLoading: boolean) {
    this.isLoading$.next(!!isLoading);
  }

  selectSchaden$ = new Subject<[MouseEvent, any]>();
  @Output()
  selectSchaden = this.selectSchaden$
    .pipe(this.swallowEvent);

  deleteSchaden$ = new Subject<[MouseEvent, any]>();
  @Output()
  deleteSchaden = this.deleteSchaden$
    .pipe(this.swallowEvent);

  isARGE = false;
  @Output()
  toggleArge = new Subject();

  @Output()
  schadenMelden = new Subject();

}
