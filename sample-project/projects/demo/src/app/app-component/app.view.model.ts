import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable} from "rxjs";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {map, shareReplay} from "rxjs/operators";
import {overviewData} from "../schemas/overview.schema";
import {multiFormOptions} from "../schemas/multi-form.schema";

@Injectable()
export class AppViewModel {
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  // OVERVIEW VARIABLES ===================================

  isLoading$ = new BehaviorSubject(false);
  schadenUebersicht = overviewData.uebersicht;
  schadenEntwurf = overviewData.entwurf;

  // FORM VARIABLES ===================================

  formDataOptions = multiFormOptions;
  formSelection$ = new BehaviorSubject(this.formDataOptions[2]);


  constructor(private breakpointObserver: BreakpointObserver) {
  }

  // OVERVIEW CALLBACKS ===================================

  onSelectSchaden(schaden) {
    console.log('onSelectSchaden', schaden);
  }

  onDeleteSchaden(schaden) {
    console.log('onDeleteSchaden', schaden);
  }

  onToggleArge(isSelected) {
    console.log('toggleArge', isSelected);
  }

  onSchadenMelden(v) {
    console.log('onSchadenMelden', v);
  }

  // FORM CALLBACKS ===================================

  onFormChange(change) {
    console.log('onFormChange', change);
  }

}
