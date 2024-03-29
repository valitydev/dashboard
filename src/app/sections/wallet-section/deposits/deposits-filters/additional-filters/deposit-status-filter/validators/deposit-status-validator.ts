import { FormControl, ValidatorFn } from '@angular/forms';
import isNil from 'lodash-es/isNil';

import { DEPOSIT_STATUSES_LIST } from '../consts';
import { DepositStatusFilterValue } from '../types/deposit-status-filter-value';

export const depositStatusValidator: ValidatorFn = (
    control: FormControl<DepositStatusFilterValue>,
) => {
    const value = control.value;
    const isValid = isNil(value) || DEPOSIT_STATUSES_LIST.includes(value);

    return isValid
        ? null
        : {
              depositStatus: true,
          };
};
