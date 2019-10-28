import {Component, Input, Output, ViewEncapsulation} from '@angular/core';
import {Subject} from 'rxjs';
import {variant} from '../../variants/variant';
import {getChangeDetection, getEncapsulation} from "../../../../element-variants/src/angular/provider.utils";

@Component({
  template: `
    <div class="consumer">
      <div class="component" [ngClass]="variantClasses">
          <div *ngFor="let obj of formattedVariant | keyvalue" [ngClass]="'box ' + obj.key">
              <span class="prop-value">{{obj.value}}</span>
              <svg class="arrow" width="190" height="160"
                           xmlns="http://www.w3.org/2000/svg">
                  <path class="arrow-line"  fill="transparent"/>
              </svg>
          </div>

          <div class="box util">&nbsp;</div>

          <div class="wc-sign">&lt;/&gt;</div>

          <div class="variant-name"><b>{{variant.name}}</b></div>
      </div>
  `,
  styleUrls: ['./variant.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class VariantConfigComponent {
  @Input() value: string;
  @Output() update = new Subject();

  variant = variant;
  formattedVariant = this.formatVariant(this.variant);
  variantClasses = Object.entries(this.formattedVariant)
    .map(([prop, val]) => `${prop}-${val}`)
    .join(' ');

  constructor() {
    console.log('formattedVariant: ', this.formattedVariant);
  }

  formatVariant(v: any) {
    const preparedVariant: any = {
      zone: v.zone,
      scripts: v.scripts,
      runtime: v.runtime,
      polyfill: v.polyfill,
      encapsulation: getEncapsulation(v.encapsulation),
      changeDetection: getChangeDetection(v.changeDetection)
    };

    return preparedVariant;
  }

}
