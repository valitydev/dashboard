import { regExpToValidator } from '../../../utils';
import { TextMaskConfig } from '../../types/text-mask-config';
import { FormatInputConfig } from '../format-input-config';

const BIN_LENGTH = 6;

export const BIN_MASK: TextMaskConfig = {
    mask: [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/],
    guide: false,
};

export const binValidator = regExpToValidator(new RegExp(`^\\d{${BIN_LENGTH}}$`));

export const BIN_CONFIG: FormatInputConfig = {
    mask: BIN_MASK,
    placeholder: '0000 00',
    postfix: '** **** ****',
    toPublicValue: (v: string) => (v ? v.replace(' ', '') : ''),
};
