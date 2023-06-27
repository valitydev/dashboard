import { maskToValidator } from '../../../utils';
import { TextMaskConfig } from '../../types/text-mask-config';
import { FormatInputConfig } from '../format-input-config';

const LEGAL_ENTITY_INN_LENGTH = 10;

export const LEGAL_ENTITY_INN_MASK: TextMaskConfig = {
    mask: new Array(LEGAL_ENTITY_INN_LENGTH).fill(/\d/),
    guide: false,
};

export const legalEntityInnValidator = maskToValidator(LEGAL_ENTITY_INN_MASK);

export const LEGAL_ENTITY_INN_CONFIG: FormatInputConfig = {
    mask: LEGAL_ENTITY_INN_MASK,
    placeholder: '0'.repeat(LEGAL_ENTITY_INN_LENGTH),
};
