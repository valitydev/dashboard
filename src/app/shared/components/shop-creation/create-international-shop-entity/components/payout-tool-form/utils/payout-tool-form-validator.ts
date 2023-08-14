import { ValidatorFn } from '@angular/forms';
import { FormGroupByValue } from '@vality/ng-core';
import isEmpty from 'lodash-es/isEmpty';

import { PayoutToolForm } from '../types/payout-tool-form';

// bic | iban | abaRtn | country & address & name should be provided;
export const payoutToolFormValidator: ValidatorFn = (
    form: FormGroupByValue<PayoutToolForm>,
): { error: boolean } | null => {
    const { bic, iban, abaRtn, country, address, name } = form.controls;

    const isValidNumbers = [
        !isEmpty(bic.value) && bic.valid,
        !isEmpty(iban.value) && iban.valid,
        !isEmpty(abaRtn.value) && abaRtn.valid,
    ].some(Boolean);

    const isValidGeo = [
        !isEmpty(country.value) && country.valid,
        !isEmpty(address.value) && address.valid,
        !isEmpty(name.value) && name.valid,
    ].every(Boolean);

    return isValidNumbers || isValidGeo ? null : { error: true };
};
