import {Component} from '@angular/core';
import {overviewData} from './schemas/overview.schema';
import {multiFormOptions} from './schemas/multi-form.schema';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
      <h1 class='mat-h1 mat-primary'>Demo AppComponent</h1>

      <div class='app-container'>
          <web-component *axLazyElement></web-component>
          <mat-web-component *axLazyElement></mat-web-component>
          <dynamic-form-component *axLazyElement [formModel]='formSelection$ | async'></dynamic-form-component>
      </div>
      <!--  CONTENT
       <div class='app-container'>
           isLoading <input type='checkbox'
                            [ngModel]='false'
                            (ngModelChange)='isLoading$.next($event)'>
           <ui-overview
                   *axLazyElement
                   [isLoading]='isLoading$ | async'
                   [schadenUebersicht]='schadenUebersicht'
                   [schadenEntwurf]='schadenEntwurf'
                   (selectSchaden)='onSelectSchaden($event)'
                   (deleteSchaden)='onDeleteSchaden($event)'
                   (toggleArge)='onToggleArge($event)'
                   (schadenMelden)='onSchadenMelden($event)'>
           </ui-overview>
       </div>
       <hr>
       <div class='app-container'>
           formData:
           <select [ngModel]='0' (ngModelChange)='formSelection$.next($event)'>
               <option
                       *ngFor='let data of formDataOptions; index as idx'
                       [value]='idx'>
                   DataSet {{idx}}
               </option>
           </select>
           <ui-form
                   *axLazyElement
                   [formData]='formDataOptions[(formSelection$ | async)]'
                   (formChange)='onFormChange($event)'>
           </ui-form>
       </div>
        -->
      <div class='app-container version'>
          no-version number
      </div>

  `
})
export class AppComponent {
  // OVERVIEW VARIABLES ===================================

  isLoading$ = new BehaviorSubject(false);
  schadenUebersicht = overviewData.uebersicht;
  schadenEntwurf = overviewData.entwurf;

  // FORM VARIABLES ===================================

  formDataOptions = multiFormOptions;
  formSelection$ = new BehaviorSubject(this.formDataOptions[1]);

  constructor() {

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
