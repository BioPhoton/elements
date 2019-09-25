import {ChangeDetectionStrategy, ViewEncapsulation} from "@angular/core";

export const environment = {
  name: 'prodControlled',
  production: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.Default,
  zoneLess: false,
  preCompiled: true
};
