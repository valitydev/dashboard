import { TextMaskConfig } from 'angular2-text-mask';

import { regExpToValidator } from '../../../utils';
import { FormatInputConfig } from '../format-input-config';

export const individualOrLegalEntityInnMask: TextMaskConfig = {
    mask: new Array(12).fill(/\d/),
    guide: false
};

export const individualOrLegalEntityInnValidator = regExpToValidator(/^(\d{10}|\d{12})$/, 'individualOrLegalEntityInn');

export const individualOrLegalEntityInnConfig: FormatInputConfig = {
    mask: individualOrLegalEntityInnMask,
    placeholder: new Array(10).fill('0').join('')
};