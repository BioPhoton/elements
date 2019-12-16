import {variant as defaultOption} from '../projects/elements/src/variants/variant.js';
import {variant as angularStyled} from '../projects/elements/src/variants/variant.angularStyled.js';
import {variant as vanillaStandAlone} from '../projects/elements/src/variants/variant.vanillaStandAlone';
import {getVariantsPlugin, VariantConfig, VariantSet} from 'angular-element-variants/index.tooling';

const variants: VariantSet = {
  defaultOption: (defaultOption as VariantConfig),
  angularStyled: (angularStyled as VariantConfig),
  vanillaStandAlone: (vanillaStandAlone as VariantConfig)
};
const variantsPlugin = getVariantsPlugin(variants);
export default variantsPlugin;
