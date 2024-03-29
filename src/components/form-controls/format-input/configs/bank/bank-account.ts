import { maskToValidator } from '../../../utils';
import { TextMaskConfig } from '../../types/text-mask-config';
import { FormatInputConfig } from '../format-input-config';

const BANK_ACCOUNT_LENGTH = 20;

export const BANK_ACCOUNT_MASK: TextMaskConfig = {
    mask: new Array(BANK_ACCOUNT_LENGTH).fill(/\d/),
    guide: false,
};

export const bankAccountValidator = maskToValidator(BANK_ACCOUNT_MASK);

export const BANK_ACCOUNT_CONFIG: FormatInputConfig = {
    mask: BANK_ACCOUNT_MASK,
    placeholder: '0'.repeat(BANK_ACCOUNT_LENGTH),
};
