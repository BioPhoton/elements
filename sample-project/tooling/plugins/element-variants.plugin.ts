import {variant as defaultVariant} from '../../projects/elements/src/variants/variant';
import {variant as angularStyled} from '../../projects/elements/src/variants/variant.angularStyled';
import {variant as vanillaStandAlone} from '../../projects/elements/src/variants/variant.vanillaStandAlone';
import {variant as testVariant} from '../../projects/elements/src/variants/variant.test';

import {VariantSet, setupBundles, getVariantConfig, postCliBuild } from 'angular-element-variants';
const variants: VariantSet = {
  defaultOption: defaultVariant,
  testVariant,
  angularStyled,
  vanillaStandAlone
};

export default {
  config(cfg, options) {
    return setupBundles(cfg, getVariantConfig(options, variants));
  },
  post(options) {
    // skip post bundling for serve scripts
    if (options.host !== 'localhost') {
      return postCliBuild(getVariantConfig(options, variants));
    }
  }
};

