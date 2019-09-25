import {ChangeDetectionStrategy, ViewEncapsulation} from "@angular/core";

export const environment = {
  name: 'devControlled',
  production: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
  zoneLess: false,
  preCompiled: true
};
