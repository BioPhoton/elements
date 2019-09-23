import {ChangeDetectionStrategy, ViewEncapsulation} from "@angular/core";

export const environment = {
  production: true,
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.Default
};
